import dayjs from "dayjs";
import "dayjs/locale/ko";
import weekday from "dayjs/plugin/weekday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { SCHEDULE_MESSAGES } from "@/lib/constants/chatbot";
import { API_ENDPOINT } from "@/lib/constants/api";

dayjs.extend(weekday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function setDateToMidnight(date: dayjs.Dayjs): dayjs.Dayjs {
  return date.startOf("day");
}

dayjs.locale("ko");

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

async function fetchScheduleData(yearMonth: string) {
  const response = await fetch(`${API_ENDPOINT.SCHEDULE}${yearMonth}`);
  if (!response.ok) return [];
  const {
    data: { list },
  } = await response.json();
  return list;
}

const emblemMap: { [key: string]: string } = {
  [TEAM_KEYS.OB]: `${TEAM_EMBLEM_PATH}dosan_emblem.png`,
  [TEAM_KEYS.HH]: `${TEAM_EMBLEM_PATH}hanhwa_emblem.png`,
  [TEAM_KEYS.HT]: `${TEAM_EMBLEM_PATH}kia_emblem.png`,
  [TEAM_KEYS.WO]: `${TEAM_EMBLEM_PATH}kiwoom_emblem.png`,
  [TEAM_KEYS.KT]: `${TEAM_EMBLEM_PATH}kt_emblem.png`,
  [TEAM_KEYS.LG]: `${TEAM_EMBLEM_PATH}lg_emblem.png`,
  [TEAM_KEYS.LT]: `${TEAM_EMBLEM_PATH}lotte_emblem.png`,
  [TEAM_KEYS.NC]: `${TEAM_EMBLEM_PATH}nc_emblem.png`,
  [TEAM_KEYS.SM]: `${TEAM_EMBLEM_PATH}sm_emblem.png`,
  [TEAM_KEYS.SS]: `${TEAM_EMBLEM_PATH}ss_emblem.png`,
  [TEAM_KEYS.SK]: `${TEAM_EMBLEM_PATH}ssg_emblem.png`,
};

const formatScheduleMessage = (schedule: any): string => {
  let { home, visit, gtime, stadium, homeKey, visitKey, displayDate } =
    schedule;

  const formattedDate = dayjs(displayDate).format("MM.DD");

  if (visitKey === TEAM_KEYS.KT) {
    // KT가 방문팀인 경우, home과 visit을 교체합니다.
    [home, visit] = [visit, home];
    [homeKey, visitKey] = [visitKey, homeKey];
  }

  const homeEmblem = emblemMap[homeKey] || `${TEAM_EMBLEM_PATH}kt_emblem.png`;
  const visitEmblem = emblemMap[visitKey] || `${TEAM_EMBLEM_PATH}kt_emblem.png`;

  return `
  <div class="border border-gray-300 p-4 my-2 rounded-lg bg-gray-50 flex flex-col items-center">
    <div class="mb-2">${formattedDate}</div>
      <div class="flex items-center justify-between w-full">
        <div class="flex flex-col items-center">
          <img src="${homeEmblem}" alt="${home} 로고" class="w-12 h-12 object-contain" />
          <div class="mt-2">${home}</div>
        </div>
      <div class="text-center">
        <div class="font-bold text-lg">${stadium}</div>
        <div>vs</div>
        <div>${gtime}</div>
      </div>
      <div class="flex flex-col items-center">
        <img src="${visitEmblem}" alt="${visit} 로고" class="w-12 h-12 object-contain" />
        <div class="mt-2">${visit}</div>
      </div>
    </div>
  </div>
`;
};
async function getTodaySchedule(): Promise<string> {
  const today = dayjs();
  const formattedDate = today.format("YYYYMMDD");
  const displayDate = today.format("YYYY.MM.DD");
  const yearMonth = today.format("YYYYMM");

  const scheduleJson = await fetchScheduleData(yearMonth);

  const todaySchedule = scheduleJson.filter(
    (item: any) =>
      item.displayDate === formattedDate &&
      (item.homeKey === TEAM_KEYS.KT || item.visitKey === TEAM_KEYS.KT)
  );

  if (todaySchedule.length > 0) {
    const messages = todaySchedule.map(formatScheduleMessage).join("");
    return `${SCHEDULE_MESSAGES.today(displayDate)}<br>${messages}`;
  }

  return SCHEDULE_MESSAGES.todayNotFound(displayDate);
}

async function getThisWeekSchedule(): Promise<string> {
  const today = dayjs();
  const startOfWeek = setDateToMidnight(today.weekday(0));
  const endOfWeek = setDateToMidnight(today.weekday(6));
  const displayStartOfWeek = startOfWeek.format("YYYY.MM.DD");
  const displayEndOfWeek = endOfWeek.format("YYYY.MM.DD");

  const yearMonth = today.format("YYYYMM");
  const scheduleJson = await fetchScheduleData(yearMonth);

  let scheduleMessage = `${SCHEDULE_MESSAGES.weekly(
    displayStartOfWeek,
    displayEndOfWeek
  )}<br>`;

  const weekSchedule = scheduleJson.filter((item: any) => {
    const itemDate = setDateToMidnight(dayjs(item.displayDate, "YYYYMMDD"));
    return (
      itemDate.isSameOrAfter(startOfWeek) &&
      itemDate.isSameOrBefore(endOfWeek) &&
      (item.homeKey === TEAM_KEYS.KT || item.visitKey === TEAM_KEYS.KT)
    );
  });

  if (weekSchedule.length === 0) {
    return SCHEDULE_MESSAGES.weeklyNotFound(
      displayStartOfWeek,
      displayEndOfWeek
    );
  }

  weekSchedule.forEach((item: any) => {
    scheduleMessage += formatScheduleMessage(item);
  });

  return scheduleMessage.trim();
}

async function getNextWeekSchedule(): Promise<string> {
  const today = dayjs();
  const startOfNextWeek = setDateToMidnight(today.weekday(7));
  const endOfNextWeek = setDateToMidnight(startOfNextWeek.add(6, "day"));
  const displayStartOfNextWeek = startOfNextWeek.format("YYYY.MM.DD");
  const displayEndOfNextWeek = endOfNextWeek.format("YYYY.MM.DD");

  const yearMonth = startOfNextWeek.format("YYYYMM");
  const scheduleJson = await fetchScheduleData(yearMonth);

  let scheduleMessage = `${SCHEDULE_MESSAGES.nextWeekly(
    displayStartOfNextWeek,
    displayEndOfNextWeek
  )}<br>`;

  const nextWeekSchedule = scheduleJson.filter((item: any) => {
    const itemDate = setDateToMidnight(dayjs(item.displayDate, "YYYYMMDD"));
    return (
      itemDate.isSameOrAfter(startOfNextWeek) &&
      itemDate.isSameOrBefore(endOfNextWeek) &&
      (item.homeKey === TEAM_KEYS.KT || item.visitKey === TEAM_KEYS.KT)
    );
  });

  if (nextWeekSchedule.length === 0) {
    return SCHEDULE_MESSAGES.nextWeeklyNotFound(
      displayStartOfNextWeek,
      displayEndOfNextWeek
    );
  }

  nextWeekSchedule.forEach((item: any) => {
    scheduleMessage += formatScheduleMessage(item);
  });

  return scheduleMessage.trim();
}

export {
  fetchScheduleData,
  getTodaySchedule,
  getThisWeekSchedule,
  getNextWeekSchedule,
  SCHEDULE_MESSAGES,
};
