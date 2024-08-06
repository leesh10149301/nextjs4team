import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const kstDate = (date: string): string => {
  const today = dayjs().tz("Asia/Seoul");
  const messageDate = dayjs(date).tz("Asia/Seoul");

  const isSameDay =
    today.year() === messageDate.year() &&
    today.month() === messageDate.month() &&
    today.date() === messageDate.date();

  if (isSameDay) {
    return messageDate.format("A hh:mm");
  } else {
    return messageDate.format("MM-DD A hh:mm");
  }
};
