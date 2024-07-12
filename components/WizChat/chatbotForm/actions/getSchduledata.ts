import scheduleJson from "public/data/kbo_schedule_july.json";

const formatDate = (date: Date): string =>
  `${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate()
  ).padStart(2, "0")}`;

const parseDate = (dateStr: string): Date => {
  const [month, day] = dateStr.split(".").map(Number);
  const currentYear = new Date().getFullYear();
  return new Date(currentYear, month - 1, day);
};

const setDateToMidnight = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

const formatScheduleMessage = (date: string, schedule: any): string => {
  const { team1, team2, time, stadium } = schedule;
  return `<div>- ${date}: ${team1} vs ${team2}<br>  - 시간: ${time}<br>  - 장소: ${stadium}</div><br>`;
};

export function getTodaySchedule(): string {
  const today = new Date();
  const formattedDate = formatDate(today);

  const todaySchedule = scheduleJson.find(
    (item: any) => item.date === formattedDate
  );

  if (todaySchedule) {
    return `오늘(${formattedDate})의 KBO 리그 경기 일정은 다음과 같습니다.<br>${formatScheduleMessage(
      todaySchedule.date,
      todaySchedule.schedule
    )}`;
  }

  return "오늘의 경기 일정이 없습니다.";
}

export function getThisWeekSchedule(): string {
  const today = new Date();
  const startOfWeek = setDateToMidnight(today);
  const endOfWeek = setDateToMidnight(new Date(today));
  endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // 오늘부터 주말까지 계산

  let scheduleMessage = `이번 주의 KBO 리그 경기 일정은 다음과 같습니다.<br>`;

  const weekSchedule = scheduleJson.filter((item: any) => {
    const itemDate = setDateToMidnight(parseDate(item.date));
    return itemDate >= startOfWeek && itemDate <= endOfWeek;
  });

  if (weekSchedule.length === 0) {
    return "이번 주의 경기 일정이 없습니다.";
  }

  weekSchedule.forEach((item: any) => {
    scheduleMessage += formatScheduleMessage(item.date, item.schedule);
  });

  return scheduleMessage.trim();
}
export function getNextWeekSchedule(): string {
  const today = new Date();
  const startOfNextWeek = new Date(today);
  startOfNextWeek.setDate(today.getDate() + (7 - today.getDay()));
  const endOfNextWeek = new Date(startOfNextWeek);
  endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);

  let scheduleMessage = `다음 주의 KBO 리그 경기 일정은 다음과 같습니다.<br>`;

  const nextWeekSchedule = scheduleJson.filter((item: any) => {
    const itemDate = parseDate(item.date);
    return itemDate >= startOfNextWeek && itemDate <= endOfNextWeek;
  });

  if (nextWeekSchedule.length === 0) {
    return "다음 주의 경기 일정이 없습니다.";
  }

  nextWeekSchedule.forEach((item: any) => {
    scheduleMessage += formatScheduleMessage(item.date, item.schedule);
  });

  return scheduleMessage.trim();
}
