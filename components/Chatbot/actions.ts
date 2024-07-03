"use server";

import { z } from "zod";
import OpenAI from "openai";
import {
  baseballResultPatterns,
  datePatterns,
  playerNamePatterns,
} from "@/lib/baseballPatterns";
import { MESSAGES } from "@/lib/constants/chatbot";

interface IMorph {
  lemma: string; //형태소
  type: string; //형태소 태그
}

interface INE {
  text: string;
  type: string;
}

interface Sentence {
  morp: IMorph[];
  NE: INE[];
}

const openai = new OpenAI();

const formDataSchema = z.object({
  question: z.string().min(1, { message: MESSAGES.EMPTY_QUESTION_ERROR }),
});

// 형태소 분석을 수행하는 함수
const performMorphologicalAnalysis = async (question: string) => {
  const openApiURL = "http://aiopen.etri.re.kr:8000/WiseNLU";
  const accessKey = process.env.NEXT_PUBLIC_ETRI_API;
  const analysisCode = process.env.NEXT_PUBLIC_ETRI_ANALYSIS_CODE;

  const requestJson = {
    argument: {
      analysis_code: analysisCode,
      text: question,
    },
  };
  const response = await fetch(openApiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessKey,
    },
    body: JSON.stringify(requestJson),
  });

  if (!response.ok) {
    throw new Error(`Error from API: ${response.status}`);
  }

  return response.json();
};

// 패러프라이즈 인식 API
//질문에 답하기 전에 먼저 두 질의를 비교하는 처리가 먼저 진행되어야 함.
const paraphrase = async (lemma: string, question: string) => {
  const openApiURL = "http://aiopen.etri.re.kr:8000/ParaphraseQA";
  const accessKey = process.env.NEXT_PUBLIC_ETRI_API;

  const requestJson = {
    argument: {
      //DB에 저장되어 있으면 저장된 데이터를 가져옴. 없으면 데이터를 추가.
      sentence1: "강백호 선수는 어떤 선수야?",
      sentence2: "KT Wiz의 강백호에 대해 알려줘.",
    },
  };

  //비교 결과
  const response = await fetch(openApiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessKey,
    },
    body: JSON.stringify(requestJson),
  });

  if (!response.ok) {
    throw new Error(`Error from API: ${response.status}`);
  }

  return response.json();
};

// 단어에 야구 경기를 물어보는 단어가 있는지 확인하는 함수
const isBaseballResultKeyword = (keyword: string): boolean => {
  return baseballResultPatterns.some((p) => p.test(keyword));
};

//단어에 kt 선수가 있는지 확인하는 함수
const isPlayerkeyword = (keyword: string): boolean => {
  return playerNamePatterns.some((p) => p.test(keyword));
};

// 단어들을 검사하는 함수
const checkKeywords = (sentenceArray: Sentence[]) => {
  let containsBaseballKeyword = false;
  let containsNameKeyword = false;

  console.log(sentenceArray[0]);

  for (const morp of sentenceArray[0].morp) {
    if (isBaseballResultKeyword(morp.lemma)) {
      containsBaseballKeyword = true;
    }
  }
  for (const ner of sentenceArray[0].NE) {
    if (ner.type === "PS_NAME") {
      containsNameKeyword = isPlayerkeyword(ner.text);
    }
  }

  return {
    containsBaseballKeyword,
    containsNameKeyword,
  };
};

//선수 이름 추출하는 함수
const extractPlayerName = (sentenceArray: Sentence[]) => {
  for (const sentence of sentenceArray) {
    for (const morp of sentence.morp) {
      if (morp.type === "NNP" || morp.type === "NNG") {
        return morp.lemma;
      }
    }
  }
  return null;
};

//DB 서버에서 선수 정보를 가져오는 함수
const fetchPlayer = async (name: string) => {
  const response = await fetch(`http://localhost:3001/player?name=${name}`);
  if (!response.ok) {
    throw new Error(`Error from DB server: ${response.status}`);
  }
  return response.json();
};

// DB 서버에서 경기 결과를 가져오는 함수
const fetchGameResult = async (date: string) => {
  const response = await fetch(
    `http://localhost:3001/game-result?date=${date}`
  );
  if (!response.ok) {
    throw new Error(`Error from DB server: ${response.status}`);
  }
  return response.json();
};

// 날짜 형식 변환 함수 (YYYY년 MM월 DD일 형식으로 변환)
const formatDateString = (date: number): string => {
  const year = date.toString().substring(0, 4);
  const month = date.toString().substring(4, 6);
  const day = date.toString().substring(6, 8);
  return `${year}년 ${month}월 ${day}일`;
};

// 현재 연도 반환 함수
const getCurrentYear = (): string => new Date().getFullYear().toString();

// 날짜 형식 변환 함수 (쿼리용 YYYYMMDD 형식)
const parseDate = (dateString: string): string | null => {
  for (const pattern of datePatterns) {
    const match = dateString.match(pattern);
    if (match) {
      let year: string, month: string, day: string;
      if (match.length === 4) {
        year = match[1].padStart(4, "0");
        month = match[2].padStart(2, "0");
        day = match[3].padStart(2, "0");
      } else if (match.length === 3) {
        year = getCurrentYear();
        month = match[1].padStart(2, "0");
        day = match[2].padStart(2, "0");
      } else {
        continue;
      }
      return `${year}${month}${day}`;
    }
  }
  return null;
};

const generateGameResultMessage = (data: {
  gameDate: number;
  home: string;
  visit: string;
  homeScore: string;
  visitScore: string;
  result: string;
}): string => {
  const formattedDate = formatDateString(data.gameDate);
  const { home, visit, homeScore, visitScore, result } = data;

  const isHomeTeam = home === "KT";
  return `${formattedDate}, ${isHomeTeam ? home : visit}는 ${
    isHomeTeam ? visit : home
  }팀과의 경기에서 ${isHomeTeam ? homeScore : visitScore} 대 ${
    isHomeTeam ? visitScore : homeScore
  }로 ${result}했습니다.`;
};

const questionGame = async (question: string) => {
  const date = parseDate(question);
  if (!date) {
    return MESSAGES.DATE_MISSING_ERROR;
  }

  try {
    const { success, data, message } = await fetchGameResult(date);
    if (success) {
      return generateGameResultMessage(data);
    } else {
      return message;
    }
  } catch (error) {
    console.log(error);
    return MESSAGES.SERVER_ERROR;
  }
};

const generatePlayerDataMessage = (data: {
  playerName: string;
  backnum: number;
  debutYear: number;
  position: string;
  hittype: string;
}): string => {
  const { playerName, backnum, debutYear, position, hittype } = data;
  return `${playerName} 선수는 ${debutYear}년에 데뷔하였으며, 포지션은 ${position}입니다. 등번호는 ${backnum}번이며, ${hittype} 타격 유형을 갖고 있습니다.`;
};

const questionPlayer = async (analysisResult: any) => {
  const searchName = extractPlayerName(analysisResult.return_object.sentence);

  try {
    const { success, data } = await fetchPlayer(searchName);
    if (success && data) {
      return generatePlayerDataMessage(data);
    } else {
      return `${searchName} 선수는 ${MESSAGES.PLAYER_NOT_FOUND}`;
    }
  } catch (error) {
    // console.log(error);
    return MESSAGES.SERVER_ERROR;
  }
};

// GPT 챗봇 함수
export async function gptChatBot(userAnswer: string) {
  let responseMessage = ""; // 결과 메시지
  const result = formDataSchema.safeParse({
    question: userAnswer,
  });

  // 빈 값인 경우 에러 메시지 반환
  if (!result.success) {
    return result.error.flatten().fieldErrors.question[0];
  }

  const { question } = result.data;

  // 형태소 분석 수행
  const analysisResult = await performMorphologicalAnalysis(question);
  const keyword = checkKeywords(analysisResult.return_object.sentence);

  // DB 검색을 위한 키워드 존재하는지 판단.
  const hasKeyword = Object.values(keyword).some((v) => v === true);

  if (hasKeyword) {
    // KT Wiz 관련 질문 처리
    if (keyword.containsBaseballKeyword) {
      responseMessage = await questionGame(question);
    } else if (keyword.containsNameKeyword) {
      responseMessage = await questionPlayer(analysisResult);
    }
  } else {
    // const para = await paraphrase("", "");
    // console.log(para.return_object.result);
    // 일반 질문 처리 (GPT-4 API 호출)
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-2024-05-13",
        max_tokens: 250,
        messages: [
          {
            role: "system",
            content:
              "WizBot is a useful assistant that provides general information about KT Wiz in the KBO, Korean Baseball League. WizBot always provides accurate and concise information in Korean. It refuses to answer questions that are not related to KT Wiz or baseball.",
          },
          { role: "user", content: question },
        ],
      });
      responseMessage = completion.choices[0].message.content;
    } catch (error) {
      console.error(error);
      responseMessage = MESSAGES.GPT_API_ERROR;
    }
  }

  return responseMessage;
}
