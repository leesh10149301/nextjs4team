import { formatDate, extractPlayerName } from "./morphologicalAnalysis";
import { getGameResult, getPlayerData } from "./databaseService";
import {
  generateGameResultMessage,
  generatePlayerDataMessage,
} from "./generateMessage";
import { MESSAGES } from "@/lib/constants/chatbot";

// 경기 결과 질문 처리 함수
const answerGameQuestion = async (question: string) => {
  const date = formatDate(question);
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
  try {
    const { success, data } = await getPlayerData(searchName);
    if (success && data) {
      return generatePlayerDataMessage(data);
    } else {
      return `${searchName} 선수는 ${MESSAGES.PLAYER_NOT_FOUND}`;
    }
  } catch (error) {
    return MESSAGES.SERVER_ERROR;
  }
};

export { answerGameQuestion, answerPlayerQuestion };
