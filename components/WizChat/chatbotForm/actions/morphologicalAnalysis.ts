import {
  baseballResultPatterns,
  datePatterns,
  playerNamePatterns,
} from "./baseballPatterns";

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

  for (const morp of sentences[0].morp) {
    if (containsBaseballResultKeyword(morp.lemma)) {
      hasBaseballKeyword = true;
    }
  }

  for (const namedEntity of sentences[0].NE) {
    if (namedEntity.type === "PS_NAME") {
      hasPlayerKeyword = containsPlayerKeyword(namedEntity.text);
    }
  }

  return {
    hasBaseballKeyword,
    hasPlayerKeyword,
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

// 현재 연도를 반환하는 함수
const getCurrentYear = (): string => new Date().getFullYear().toString();

// 날짜 형식을 변환하는 함수 (쿼리용 YYYYMMDD 형식)
const formatDate = (dateString: string): string | null => {
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

export {
  performMorphologicalAnalysis,
  analyzeKeywords,
  extractPlayerName,
  containsBaseballResultKeyword,
  containsPlayerKeyword,
  getCurrentYear,
  formatDate,
};
