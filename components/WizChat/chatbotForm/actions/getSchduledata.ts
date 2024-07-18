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

const formatDate = (date: Date): string =>
  `${String(date.getFullYear())}${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(date.getDate()).padStart(2, "0")}`;

const parseDate = (dateStr: string): Date => {
  const year = parseInt(dateStr.slice(0, 4), 10);
  const month = parseInt(dateStr.slice(4, 6), 10) - 1;
  const day = parseInt(dateStr.slice(6, 8), 10);
  return new Date(year, month, day);
};

const setDateToMidnight = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

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
  let { home, visit, gtime, stadium, homeKey, visitKey } = schedule;

  if (visitKey === "KT") {
    // KT가 방문팀인 경우, home과 visit을 교체합니다.
    [home, visit] = [visit, home];
    [homeKey, visitKey] = [visitKey, homeKey];
  }

  const homeEmblem = emblemMap[homeKey] || "/icons/emblems/kt_emblem.png";
  const visitEmblem = emblemMap[visitKey] || "/icons/emblems/kt_emblem.png";

  return `
    <div class="border border-gray-300 p-4 my-2 rounded-lg bg-gray-50 flex items-center justify-between">
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
    </div>`;
};

export async function getTodaySchedule(): Promise<string> {
  const today = new Date();
  const formattedDate = formatDate(today);
  const yearMonth = formattedDate.slice(0, 6);

  const scheduleJson = await fetchScheduleData(yearMonth);

  const todaySchedule = scheduleJson.filter(
    (item: any) =>
      item.displayDate === formattedDate &&
      (item.homeKey === "KT" || item.visitKey === "KT")
  );

  if (todaySchedule.length > 0) {
    const messages = todaySchedule.map(formatScheduleMessage).join("");
    return `오늘(${formattedDate.slice(
      4
    )})의 KBO 리그 경기 일정은 다음과 같습니다.<br>
    ${messages}`;
  }

  return "오늘의 경기 일정이 없습니다.";
}

export async function getThisWeekSchedule(): Promise<string> {
  const today = new Date();
  const startOfWeek = setDateToMidnight(today);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + (6 - startOfWeek.getDay()));

  const yearMonth = formatDate(today).slice(0, 6);
  const scheduleJson = await fetchScheduleData(yearMonth);

  let scheduleMessage = `이번 주의 KBO 리그 경기 일정은 다음과 같습니다.<br>`;

  const weekSchedule = scheduleJson.filter((item: any) => {
    const itemDate = setDateToMidnight(parseDate(item.displayDate));
    return (
      itemDate >= startOfWeek &&
      itemDate <= endOfWeek &&
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

export async function getNextWeekSchedule(): Promise<string> {
  const today = new Date();
  const startOfNextWeek = new Date(today);
  startOfNextWeek.setDate(today.getDate() + (7 - today.getDay()));
  const endOfNextWeek = new Date(startOfNextWeek);
  endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);

  const yearMonth = formatDate(startOfNextWeek).slice(0, 6);
  const scheduleJson = await fetchScheduleData(yearMonth);

  let scheduleMessage = `다음 주의 KBO 리그 경기 일정은 다음과 같습니다.<br>`;

  const nextWeekSchedule = scheduleJson.filter((item: any) => {
    const itemDate = parseDate(item.displayDate);
    return (
      itemDate >= startOfNextWeek &&
      itemDate <= endOfNextWeek &&
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
