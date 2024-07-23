import dayjs from "dayjs";

type TupleIndex = [number | null, number | null];

let lastUsedTemplates: TupleIndex = [null, null];

const selectNonRepeatingTemplate = (
  templates: string[],
  lastUsed: TupleIndex
): { template: string; updatedLastUsed: TupleIndex } => {
  let templateIndex: number;
  do {
    templateIndex = Math.floor(Math.random() * templates.length);
  } while (lastUsed.includes(templateIndex));

  const updatedLastUsed: TupleIndex = [templateIndex, lastUsed[0]];
  return { template: templates[templateIndex], updatedLastUsed };
};

const formatDateString = (date: string): string => {
  const formattedDate = dayjs(date, "YYYYMMDD").format("YYYY년 MM월 DD일");
  return formattedDate;
};

// 선수 정보 메시지
export const generatePlayerDataMessage = (data: {
  p_code: number;
  player_name: string;
  back_number: number;
  debut_year: number;
  position: string;
  hit_type: string;
}): string => {
  const {
    p_code,
    player_name: playerName,
    back_number: backnum,
    debut_year: debutYear,
    position,
    hit_type: hittype,
  } = data;

  const templates = [
    `${playerName} 선수는 ${debutYear}년에 데뷔하였으며, 포지션은 ${position}입니다. 등번호는 ${backnum}번이며, ${hittype} 타격 유형을 갖고 있습니다. 더 자세한 정보는 <a href="/player/team/detail/${p_code}">${playerName} 선수 소개</a>에서 확인할 수 있습니다.`,
    `${debutYear}년 데뷔한 ${playerName}는 ${position} 포지션을 맡고 있습니다. ${backnum}번 등번호를 달고 ${hittype} 타자로 활약 중입니다. 더 자세한 정보는 <a href="/player/team/detail/${p_code}">${playerName} 선수 소개</a>에서 확인할 수 있습니다.`,
    `${position} 포지션을 맡고 있는 ${playerName} 선수는 ${debutYear}년에 프로 무대에 첫 발을 내디뎠습니다. ${backnum}번 유니폼을 입고 ${hittype} 타격을 선보이고 있습니다. 더 자세한 정보는 <a href="/player/team/detail/${p_code}">${playerName} 선수 소개</a>에서 확인할 수 있습니다.`,
  ];

  const { template, updatedLastUsed } = selectNonRepeatingTemplate(
    templates,
    lastUsedTemplates
  );
  lastUsedTemplates = updatedLastUsed;

  return template;
};

export const generateSeasonMessage = (
  seasonsummary: Record<string, string | number>,
  position: string
) => {
  if (position === "투수") {
    return `이번 시즌 ${seasonsummary.gamenum}경기에 등판하여, ${seasonsummary.innDisplay}이닝을 소화하며 평균 자책점 ${seasonsummary.era}를 기록했습니다. 총 ${seasonsummary.w}승 ${seasonsummary.l}패 ${seasonsummary.sv}세이브를 기록했으며, 삼진 ${seasonsummary.kk}개, 볼넷 ${seasonsummary.bb}개, 피안타 ${seasonsummary.hit}개, 피홈런 ${seasonsummary.hr}개를 허용했습니다. 이닝당 출루 허용율 (WHIP)은 ${seasonsummary.whip}입니다.`;
  } else {
    return `이번 시즌 ${seasonsummary.gamenum}경기에서 ${
      seasonsummary.ab ?? 0
    }타수 ${seasonsummary.hit ?? 0}안타, 타율 ${seasonsummary.bra ?? 0}, ${
      seasonsummary.hr ?? 0
    }홈런, ${seasonsummary.rbi ?? 0}타점, ${
      seasonsummary.run ?? 0
    }득점을 기록했습니다. OPS는 ${seasonsummary.ops ?? 0}입니다.`;
  }
};

// 경기 결과 메시지
export const generateGameResultMessage = (data: {
  displayDate: string;
  home: string;
  visit: string;
  homeScore: number;
  visitScore: number;
}): string => {
  const formattedDate = formatDateString(data.displayDate);
  let { home, visit, homeScore, visitScore } = data;

  // visit가 KT인 경우 home, homeScore와 visit, visitScore 서로 교체.
  if (visit === "KT") {
    [home, visit] = [visit, home];
    [homeScore, visitScore] = [visitScore, homeScore];
  }

  // KT의 score가 높으면 승리, 낮으면 패배
  const result = homeScore > visitScore ? "승리" : "패배";

  const templates = [
    `${formattedDate}, ${home}는 ${visit}팀과의 경기에서 ${homeScore} 대 ${visitScore}로 경기를 마쳤습니다.`,
    `${home}팀은 ${formattedDate} ${visit}팀 원정에서 ${homeScore}-${visitScore} 스코어를 기록했습니다.`,
    `${home}는 ${formattedDate} 홈에서 열린 ${visit}와의 경기에서 ${homeScore}-${visitScore}의 결과를 얻었습니다.`,
    `${formattedDate} 경기, ${home}가 ${visit}를 상대로 ${homeScore}-${visitScore}의 스코어로 경기를 끝냈습니다.`,
    `${home}는 ${formattedDate}에 열린 ${visit}와의 맞대결에서 ${homeScore} 대 ${visitScore}의 결과를 기록했습니다.`,
    `${formattedDate} ${home}와 ${visit}의 경기는 ${homeScore}-${visitScore}로 종료되었습니다.`,
    `${home}는 ${visit}와의 ${formattedDate} 경기에서 ${homeScore}-${visitScore}의 스코어를 남겼습니다.`,
  ];

  const { template, updatedLastUsed } = selectNonRepeatingTemplate(
    templates,
    lastUsedTemplates
  );
  lastUsedTemplates = updatedLastUsed;
  return template;
};

export const generateRankResultMessage = (ktRankResult) => {
  return `KT는 현재 리그 ${ktRankResult[0].순위}위입니다.<br>
   KT는 ${ktRankResult[0].G}경기를 치러 ${ktRankResult[0].승}승 ${ktRankResult[0].패}패 ${ktRankResult[0].무}무, 승률 ${ktRankResult[0].승률}을 기록 중입니다.<br>
   1위 팀과의 격차는 ${ktRankResult[0].승차}경기입니다.`;
};

export const generateCreateMessage = `KT Wiz는 2013년에 창단된 구단입니다. 2013년 5월 7일에 구단명을 공모전을 통해 발표했고, 같은 해에 한국프로야구 신인 드래프트를 통해 신인 선수를 선발했습니다. 2014년에는 한국야구퓨처스리그(2군 리그)에 참여했으며, 2015년부터는 KBO 리그(1군 리그)에 정식으로 참가하기 시작했습니다. KT Wiz는 KBO 리그의 10번째 구단으로, 프로야구 10구단 창단에 대한 논의는 2002년부터 있었지만 실제 창단은 2013년에 이루어졌습니다. `;

export const generateFavoritePlayerMessage = `
KT Wiz의 인기 선수로는 강백호와 황재균을 꼽을 수 있습니다. 강백호는 뛰어난 타격 실력으로 정평이 나 있으며, 황재균은 팀의 베테랑으로서 중요한 역할을 하고 있습니다. 이 외에도 팀을 대표하는 선수들이 많이 있습니다.<br>
  <a href="/player/team/detail/68050">강백호 선수 소개</a> <br>
  <a href="/player/team/detail/76313">황재균 선수 소개</a>
`;

export const generateMascotMessage =
  "KT Wiz의 마스코트는 빅(Vic)과 또리(Ddory)입니다. 빅은 공격형 파워와 강인함을 상징하고, 또리는 수비와 신속한 기동력을 상징합니다. 두 마스코트가 함께 있을 때 ‘빅또리’라고 불리며, 이는 KT Wiz의 승리를 의미합니다.";

export const generateBookingMessage = `
  KT 위즈 경기를 예매하는 방법은 다음과 같습니다:<br>
<br>
<b>온라인 예매:</b><br>
- KT 위즈 공식 홈페이지에서 티켓링크(<a href="http://www.ticketlink.co.kr" target="_blank">http://www.ticketlink.co.kr</a>)로 연결되어 예매할 수 있습니다.<br>
- 티켓링크 웹사이트에서 직접 KT 위즈 경기를 검색하여 예매할 수 있습니다.<br>
<br>
<b>현장 구매:</b><br>
- KT 위즈 파크 매표소에서 당일 티켓을 구매할 수 있습니다.<br>
<br>
<b>모바일 앱:</b><br>
- '위잽' 앱을 통해 무료로 야구 티켓을 예매할 수 있습니다. 앱 설치 후 회원가입과 로그인이 필요합니다.<br>
<br>
<b>예매 시 주의사항:</b><br>
- KT 위즈 홈경기의 경우, 경기 7일 전 오후 2시부터 예매가 가능합니다.<br>
- 주차를 원하는 경우, 반드시 사전에 주차 예약을 해야 합니다. 주차 예약은 경기 7일 전 오후 2시부터 가능하며, 예약 없이는 경기장 내 주차가 불가능합니다.<br>
- 티켓 가격과 할인 혜택에 대한 정보는 KT 위즈 공식 홈페이지의 '티켓 예매' 섹션에서 확인할 수 있습니다.`;
