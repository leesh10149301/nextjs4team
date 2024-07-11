import { baseballResultPatterns, playerNamePatterns } from "@/lib/patterns";

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

// 문장을 검사하는 함수
const analyzeKeywords = (sentences: Sentence[]) => {
  let hasBaseballKeyword = false;
  let hasPlayerKeyword = false;
  let hasTodayResult = false;
  let hasScoreResult = false;
  let hasBooking = false;
  let hasMascot = false;

  for (const morp of sentences[0].morp) {
    if (containsBaseballResultKeyword(morp.lemma)) {
      hasBaseballKeyword = true;
    }
    if (containsScoreResultKeyword(morp.lemma)) {
      hasScoreResult = true;
    }
    if (containsBookingKeyword(morp.lemma)) {
      hasBooking = true;
    }
    if (containsMascotKeyword(morp.lemma)) {
      hasMascot = true;
    }
  }

  for (const namedEntity of sentences[0].NE) {
    if (namedEntity.type === "PS_NAME") {
      hasPlayerKeyword = containsPlayerKeyword(namedEntity.text);
    }
    if (namedEntity.type === "DT_DAY") {
      hasTodayResult = namedEntity.text === "오늘";
    }
  }

  return {
    hasBaseballKeyword,
    hasPlayerKeyword,
    hasTodayResult,
    hasScoreResult,
    hasBooking,
    hasMascot,
  };
};

// 선수 이름을 추출하는 함수
const extractPlayerName = (sentences: Sentence[]) => {
  for (const namedEntity of sentences[0].NE) {
    if (namedEntity.type === "PS_NAME") {
      return namedEntity.text;
    }
  }
  return null;
};

// 단어에 야구 경기를 물어보는 단어가 있는지 확인하는 함수
const containsBaseballResultKeyword = (keyword: string): boolean => {
  return baseballResultPatterns.some((pattern) => pattern.test(keyword));
};

// 단어에 선수 이름이 있는지 확인하는 함수
const containsPlayerKeyword = (keyword: string): boolean => {
  return playerNamePatterns.some((pattern) => pattern.test(keyword));
};

// 단어에 성적이 있는지 확인하는 함수
const containsScoreResultKeyword = (keyword: string): boolean => {
  return /성적/.test(keyword);
};

// 단어에 예매가 있는지 확인하는 함수
const containsBookingKeyword = (keyword: string): boolean => {
  return /예매/.test(keyword);
};

// 단어에 마스코트가 있는지 확인하는 함수
const containsMascotKeyword = (keyword: string): boolean => {
  return /마스코트/.test(keyword);
};

export { performMorphologicalAnalysis, analyzeKeywords, extractPlayerName };
