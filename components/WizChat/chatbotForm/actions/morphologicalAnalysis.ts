import { baseballResultPatterns, playerNamePatterns } from "@/lib/patterns";
import { paraphraseRecognition } from "./paraphraseRecognition";

interface IMorph {
  lemma: string;
  type: string;
}

interface INamedEntity {
  text: string;
  type: string;
}

interface Sentence {
  morp: IMorph[];
  word: { text: string }[];
  NE: INamedEntity[];
}

// 형태소 분석을 수행하는 함수
const performMorphologicalAnalysis = async (question: string) => {
  const openApiURL = "http://aiopen.etri.re.kr:8000/WiseNLU";
  const accessKey = process.env.NEXT_PUBLIC_ETRI_API;
  const analysisCode = process.env.NEXT_PUBLIC_ETRI_ANALYSIS_CODE;

  if (!accessKey || !analysisCode) {
    throw new Error("ETRI API keys are missing");
  }

  const requestPayload = {
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
    body: JSON.stringify(requestPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error from API: ${response.status} - ${errorText}`);
  }

  return response.json();
};

// 키워드 확인 함수 맵
const keywordCheckFunctions: { [key: string]: (keyword: string) => boolean } = {
  baseballResult: (keyword) =>
    baseballResultPatterns.some((pattern) => pattern.test(keyword)),
  playerKeyword: (keyword) =>
    playerNamePatterns.some((pattern) => pattern.test(keyword)),
  scoreResult: (keyword) => /성적/.test(keyword),
  booking: (keyword) => /예매/.test(keyword),
  favlite: (keyword) => /인기/.test(keyword),
  mascot: (keyword) => /마스코트/.test(keyword),
  createTeam: (keyword) => /창단/.test(keyword),
};

// 문장을 검사하는 함수
const analyzeKeywords = async (sentences: Sentence[]) => {
  const result = {
    hasBaseballKeyword: false,
    hasPlayerKeyword: false,
    hasTodayResult: false,
    hasScoreResult: false,
    hasFavlite: false,
    hasBooking: false,
    hasMascot: false,
    hasCreateTeam: false,
  };

  for (const morp of sentences[0].morp) {
    for (const key in keywordCheckFunctions) {
      if (keywordCheckFunctions[key](morp.lemma)) {
        result[`has${key.charAt(0).toUpperCase() + key.slice(1)}`] = true;
      }
    }
  }

  for (const namedEntity of sentences[0].NE) {
    if (namedEntity.type === "PS_NAME") {
      result.hasPlayerKeyword = keywordCheckFunctions.playerKeyword(
        namedEntity.text
      );
    }
    if (namedEntity.type === "DT_DAY" && namedEntity.text === "오늘") {
      result.hasTodayResult = true;
    }
  }

  return result;
};

// 선수 이름을 추출하는 함수
const extractPlayerName = (sentences: Sentence[]) => {
  const playerEntity = sentences[0].NE.find((ne) => ne.type === "PS_NAME");
  return playerEntity ? playerEntity.text : null;
};

const extractPerformance = (sentences: Sentence[]) => {
  return sentences[0].word.some((word) => word.text.includes("성적"));
};

export {
  performMorphologicalAnalysis,
  analyzeKeywords,
  extractPlayerName,
  extractPerformance,
};
