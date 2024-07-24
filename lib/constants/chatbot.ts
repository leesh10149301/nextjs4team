const MESSAGES = {
  WELCOME: "안녕하세요! 무엇을 도와드릴까요?",
  EMPTY_QUESTION_ERROR: "질문은 비어 있을 수 없습니다.",
  DATE_MISSING_ERROR:
    "경기 날짜를 알려주시면 경기 결과를 알려드릴 수 있습니다.",
  SERVER_ERROR: "서버 에러 발생, 다시 시도 해주세요.",
  PLAYER_NOT_FOUND:
    "죄송합니다. 저는 KT Wiz 선수에 대한 질문에만 답변할 수 있습니다. KT Wiz 선수와 관련된 다른 질문이 있으시면 말씀해 주세요.",
  GPT_API_ERROR: "GPT API 호출 중 에러가 발생했습니다.",
};

const INIT_FAQ_SENTENCE: { sentence: string }[] = [
  { sentence: "예매는 어디서 하지?" },
  { sentence: "KT Wiz는 언제 창단되었어?" },
  { sentence: "KT Wiz의 인기 선수는 누구야?" },
];

const SCHEDULE_MESSAGES = {
  today: (date: string) => `오늘(${date})의 경기 일정은 다음과 같습니다.`,
  todayNotFound: (date: string) => `오늘(${date})의 경기 일정이 없습니다.`,
  weekly: (startDate: string, endDate: string) =>
    `이번 주(${startDate} ~ ${endDate})의 경기 일정은 다음과 같습니다.`,
  weeklyNotFound: (startDate: string, endDate: string) =>
    `이번 주(${startDate} ~ ${endDate})의 경기 일정이 없습니다.`,
  nextWeekly: (startDate: string, endDate: string) =>
    `다음 주(${startDate} ~ ${endDate})의 경기 일정은 다음과 같습니다.`,
  nextWeeklyNotFound: (startDate: string, endDate: string) =>
    `다음 주(${startDate} ~ ${endDate})의 경기 일정이 없습니다.`,
};

const TEAM_EMBLEM_PATH = "/icons/emblems/";

const TEAM_KEYS = {
  KT: "KT",
  OB: "OB",
  HH: "HH",
  HT: "HT",
  WO: "WO",
  LG: "LG",
  LT: "LT",
  NC: "NC",
  SM: "SM",
  SS: "SS",
  SK: "SK",
};

export {
  MESSAGES,
  INIT_FAQ_SENTENCE,
  SCHEDULE_MESSAGES,
  TEAM_EMBLEM_PATH,
  TEAM_KEYS,
};
