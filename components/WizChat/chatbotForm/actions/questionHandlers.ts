import { extractPerformance, extractPlayerName } from "./morphologicalAnalysis";
import {
  getPlayerSelectedData,
  getGameResult,
  getPlayerData,
} from "./databaseService";
import {
  generateGameResultMessage,
  generatePlayerDataMessage,
  generateSeasonMessage,
} from "./generateMessage";
import { MESSAGES } from "@/lib/constants/chatbot";
import { formatDateToYYYYMMDD } from "@/lib/formatDateToYYYMMDD";

// 경기 결과 질문 처리 함수
const answerGameQuestion = async (question: string) => {
  const date = formatDateToYYYYMMDD(question);
  if (!date) {
    return MESSAGES.DATE_MISSING_ERROR;
  }

  try {
    const { success, data, message } = await getGameResult(date);
    console.log(data);
    if (success) {
      return generateGameResultMessage(data);
    } else {
      return message;
    }
  } catch (error) {
    console.error(error);
    return MESSAGES.SERVER_ERROR;
  }
};

// 선수 질문 처리 함수
const answerPlayerQuestion = async (analysisResult: any) => {
  const searchName = extractPlayerName(analysisResult.return_object.sentence);
  //추가 키워드로 성적을 물어보는 경우
  const isPlayerPerformance = extractPerformance(
    analysisResult.return_object.sentence
  );
  try {
    if (isPlayerPerformance) {
      const { pcode, position } = await getPlayerSelectedData(searchName);

      const response = await fetch(
        `http://3.35.50.52:5002/player_data?pcode=${pcode}`
      ).then((res) => res.json());
      return generateSeasonMessage(response.data.seasonsummary, position);
    } else {
      const { success, data } = await getPlayerData(searchName);
      if (success && data) {
        return generatePlayerDataMessage(data);
      } else {
        return `${searchName} 선수는 ${MESSAGES.PLAYER_NOT_FOUND}`;
      }
    }
  } catch (error) {
    return MESSAGES.SERVER_ERROR;
  }
};

const answerDateQuestion = async (question: string) => {
  if (question.includes("오늘")) {
    if (question.includes("순위")) {
      // 오늘 순위를 알려줘
      const response = await fetch("http://3.35.50.52:5002/today_rank").then(
        (d) => d.json()
      );
    } else if (question.includes("경기")) {
      // 오늘 경기를 알려줘
      const response = await fetch("http://3.35.50.52:5002/games").then((d) =>
        d.json()
      );
    }
  } else if (question.includes("이번주") || question.includes("지난주")) {
    if (question.includes("경기 일정")) {
      // 이번주 경기를 알려줘
      const response = await fetch("http://3.35.50.52:5002/games").then((d) =>
        d.json()
      );
    } else {
      // 경기 일정이 아닌 질문엔 거절 메시지
      return "경기 일정에 관한 질문만 답변할 수 있습니다.";
    }
  }
};

export { answerGameQuestion, answerPlayerQuestion };
