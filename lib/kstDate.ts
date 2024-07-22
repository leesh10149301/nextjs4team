export const kstDate = (date: string) => {
  const today = new Date();
  const messageDate = new Date(date);

  const isSameDay =
    today.getFullYear() === messageDate.getFullYear() &&
    today.getMonth() === messageDate.getMonth() &&
    today.getDate() === messageDate.getDate();

  if (isSameDay) {
    const timeOptions: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Seoul",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const timeFormatter = new Intl.DateTimeFormat("ko-KR", timeOptions);
    return timeFormatter.format(messageDate);
  } else {
    const dateOptions: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Seoul",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const dateFormatter = new Intl.DateTimeFormat("ko-KR", dateOptions);
    return dateFormatter.format(messageDate);
  }
};
