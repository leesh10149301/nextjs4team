const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const API_ENDPOINT = {
  SCHEDULE: `${API_BASE_URL}/get_schedule?yearMonth=`,
  TODAY_RANK: `${API_BASE_URL}/today_rank`,
  CURRENT_INFO: `${API_BASE_URL}/get_current_info`,
  PLAYER_INFO: `${API_BASE_URL}/player_data?pcode=`,
  NEWS_LIST: `${API_BASE_URL}/news_list?searchmax=5&page=1`,
  DAILY_TEAMDATA: `${API_BASE_URL}/daily_teamdata`,
};
