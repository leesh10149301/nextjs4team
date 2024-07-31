import dayjs from "dayjs";
import { extractPerformance, extractPlayerName } from "./morphologicalAnalysis";
import { getPlayerSelectedData, getPlayerData } from "./databaseService";
import {
  generateGameResultMessage,
  generatePlayerDataMessage,
  generateRankResultMessage,
  generateSeasonMessage,
} from "./generateMessage";
import { MESSAGES } from "@/lib/constants/chatbot";
import { formatDateToYYYYMMDD } from "@/lib/formatDateToYYYMMDD";
import {
  fetchScheduleData,
  getNextWeekSchedule,
  getThisWeekSchedule,
  getTodaySchedule,
} from "./getSchduledata";
import { useRouter } from "next/router";

// 경기 결과 질문 처리 함수
const answerGameQuestion = async (question: string) => {
  const today = dayjs();
  const yearMonth = today.format("YYYYMM");
  const date = formatDateToYYYYMMDD(question);

  if (!date) {
    return MESSAGES.DATE_MISSING_ERROR;
  }

  try {
    const data = await fetchScheduleData(yearMonth);
    const response = data.find(
      (listItem) =>
        listItem.displayDate === date &&
        (listItem.home === "KT" || listItem.visit === "KT")
    );

    if (!response) {
      return MESSAGES.DATE_MISSING_ERROR;
    }

    return generateGameResultMessage(response);
  } catch (e) {
    console.log(e);
    return MESSAGES.DATE_MISSING_ERROR;
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
      const { p_code, position } = await getPlayerSelectedData(searchName);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/player_info?pcode=${p_code}`
      ).then((res) => res.json());

      console.log("response", response);
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

const fetchTodayRank = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/today_rank"
  );
  const data = await response.json();
  return data;
};

const isGameScheduleQuestion = (question: string) =>
  question.includes("경기") || question.includes("일정");

const answerDateQuestion = async ({ type }, question: string) => {
  //오늘
  if (type === "DT_DAY") {
    //오늘 순위
    if (question.includes("순위")) {
      const ktRankResult = await fetchTodayRank();
      return generateRankResultMessage(ktRankResult);
      //오늘 경기
    } else if (isGameScheduleQuestion(question)) {
      return await getTodaySchedule();
    }
  }
  if (type === "DT_OTHERS") {
    if (question.includes("이번주") || question.includes("이번 주")) {
      if (isGameScheduleQuestion(question)) {
        return await getThisWeekSchedule();
      } else {
        return "경기 일정에 관한 질문만 답변할 수 있습니다.";
      }
    } else if (question.includes("다음주") || question.includes("다음 주")) {
      if (isGameScheduleQuestion(question)) {
        return await getNextWeekSchedule();
      } else {
        return "경기 일정에 관한 질문만 답변할 수 있습니다.";
      }
    }
  }
  return "오늘 뭐요?";
};

export { answerGameQuestion, answerPlayerQuestion, answerDateQuestion };
