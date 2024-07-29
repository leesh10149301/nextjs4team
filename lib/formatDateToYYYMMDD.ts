import dayjs from "dayjs";
import { datePatterns } from "./patterns";

const getCurrentYear = (): string => dayjs().year().toString();

export const formatDateToYYYYMMDD = (dateString: string): string | null => {
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
      const formattedDate = dayjs(`${year}-${month}-${day}`, "YYYY-MM-DD");
      if (formattedDate.isValid()) {
        return formattedDate.format("YYYYMMDD");
      }
    }
  }
  return null;
};
