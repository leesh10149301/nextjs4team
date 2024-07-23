import dayjs from "dayjs";
import "dayjs/locale/ko";
import weekday from "dayjs/plugin/weekday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(weekday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function setDateToMidnight(date: dayjs.Dayjs): dayjs.Dayjs {
  return date.startOf("day");
}

dayjs.locale("ko");

const SCHEDULE_API_URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT + "/get_schedule?yearMonth=";

async function fetchScheduleData(yearMonth: string) {
  const response = await fetch(`${SCHEDULE_API_URL}${yearMonth}`);
  if (!response.ok) return [];
  const {
    data: { list },
  } = await response.json();
  return list;
}

const emblemMap: { [key: string]: string } = {
  "OB": "/icons/emblems/dosan_emblem.png",
  "HH": "/icons/emblems/hanhwa_emblem.png",
  "HT": "/icons/emblems/kia_emblem.png",
  "WO": "/icons/emblems/kiwoom_emblem.png",
  "KT": "/icons/emblems/kt_emblem.png",
  "LG": "/icons/emblems/lg_emblem.png",
  "LT": "/icons/emblems/lotte_emblem.png",
  "NC": "/icons/emblems/nc_emblem.png",
  "SM": "/icons/emblems/sm_emblem.png",
  "SS": "/icons/emblems/ss_emblem.png",
  "SK": "/icons/emblems/ssg_emblem.png",
};

const formatScheduleMessage = (schedule: any): string => {
  let { home, visit, gtime, stadium, homeKey, visitKey, displayDate } =
    schedule;

  const formattedDate = dayjs(displayDate).format("MM.DD");

  if (visitKey === "KT") {
    // KT가 방문팀인 경우, home과 visit을 교체합니다.
    [home, visit] = [visit, home];
    [homeKey, visitKey] = [visitKey, homeKey];
  }

  const homeEmblem = emblemMap[homeKey] || "/icons/emblems/kt_emblem.png";
  const visitEmblem = emblemMap[visitKey] || "/icons/emblems/kt_emblem.png";

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
  const yearMonth = today.format("YYYYMM");

  const scheduleJson = await fetchScheduleData(yearMonth);

  const todaySchedule = scheduleJson.filter(
    (item: any) =>
      item.displayDate === formattedDate &&
      (item.homeKey === "KT" || item.visitKey === "KT")
  );

  if (todaySchedule.length > 0) {
    const messages = todaySchedule.map(formatScheduleMessage).join("");
    return `오늘(${today.format(
      "MMDD"
    )})의 KBO 리그 경기 일정은 다음과 같습니다.<br>
    ${messages}`;
  }

  return "오늘의 경기 일정이 없습니다.";
}

async function getThisWeekSchedule(): Promise<string> {
  const today = dayjs();
  const startOfWeek = setDateToMidnight(today.weekday(0));
  const endOfWeek = setDateToMidnight(today.weekday(6));

  const yearMonth = today.format("YYYYMM");
  const scheduleJson = await fetchScheduleData(yearMonth);

  let scheduleMessage = `이번 주의 KBO 리그 경기 일정은 다음과 같습니다.<br>`;

  const weekSchedule = scheduleJson.filter((item: any) => {
    const itemDate = setDateToMidnight(dayjs(item.displayDate, "YYYYMMDD"));
    return (
      itemDate.isSameOrAfter(startOfWeek) &&
      itemDate.isSameOrBefore(endOfWeek) &&
      (item.homeKey === "KT" || item.visitKey === "KT")
    );
  });

  if (weekSchedule.length === 0) {
    return "이번 주의 경기 일정이 없습니다.";
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

  const yearMonth = startOfNextWeek.format("YYYYMM");
  const scheduleJson = await fetchScheduleData(yearMonth);

  let scheduleMessage = `다음 주의 KBO 리그 경기 일정은 다음과 같습니다.<br>`;

  const nextWeekSchedule = scheduleJson.filter((item: any) => {
    const itemDate = setDateToMidnight(dayjs(item.displayDate, "YYYYMMDD"));
    return (
      itemDate.isSameOrAfter(startOfNextWeek) &&
      itemDate.isSameOrBefore(endOfNextWeek) &&
      (item.homeKey === "KT" || item.visitKey === "KT")
    );
  });

  if (nextWeekSchedule.length === 0) {
    return "다음 주의 경기 일정이 없습니다.";
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
};
