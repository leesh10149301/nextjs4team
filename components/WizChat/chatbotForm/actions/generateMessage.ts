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

const formatDateString = (date: number): string => {
  const year = date.toString().substring(0, 4);
  const month = date.toString().substring(4, 6);
  const day = date.toString().substring(6, 8);
  return `${year}년 ${month}월 ${day}일`;
};

// 선수 정보 메시지
export const generatePlayerDataMessage = (data: {
  pcode: number;
  playerName: string;
  backnum: number;
  debutYear: number;
  position: string;
  hittype: string;
}): string => {
  const { pcode, playerName, backnum, debutYear, position, hittype } = data;

  const templates = [
    `${playerName} 선수는 ${debutYear}년에 데뷔하였으며, 포지션은 ${position}입니다. 등번호는 ${backnum}번이며, ${hittype} 타격 유형을 갖고 있습니다. 더 자세한 정보는 <a href="/player/team/detail/${pcode}">${playerName} 선수 소개</a>에서 확인할 수 있습니다.`,
    `${debutYear}년 데뷔한 ${playerName}는 ${position} 포지션을 맡고 있습니다. ${backnum}번 등번호를 달고 ${hittype} 타자로 활약 중입니다. 더 자세한 정보는 <a href="/player/team/detail/${pcode}">${playerName} 선수 소개</a>에서 확인할 수 있습니다.`,
    `${position} 포지션을 맡고 있는 ${playerName} 선수는 ${debutYear}년에 프로 무대에 첫 발을 내디뎠습니다. ${backnum}번 유니폼을 입고 ${hittype} 타격을 선보이고 있습니다. 더 자세한 정보는 <a href="/player/team/detail/${pcode}">${playerName} 선수 소개</a>에서 확인할 수 있습니다.`,
  ];

  const { template, updatedLastUsed } = selectNonRepeatingTemplate(
    templates,
    lastUsedTemplates
  );
  lastUsedTemplates = updatedLastUsed;

  return template;
};

// 경기 결과 메시지
export const generateGameResultMessage = (data: {
  gameDate: number;
  home: string;
  visit: string;
  homeScore: string;
  visitScore: string;
  result: string;
}): string => {
  const formattedDate = formatDateString(data.gameDate);
  const { home, visit, homeScore, visitScore, result } = data;

  const templates = [
    `${formattedDate}, ${home}는 ${visit}팀과의 경기에서 ${homeScore} 대 ${visitScore}로 ${result}했습니다.`,
    `${formattedDate}, ${visit}는 ${home}팀과의 원정경기에서 ${visitScore} 대 ${homeScore}로 ${result}했습니다.`,
    `${formattedDate} 열린 ${home}와 ${visit}의 맞대결에서 ${homeScore}:${visitScore}로 ${home}팀이 ${result}를 거뒀습니다.`,
    `${visit}팀은 ${formattedDate} ${home}팀 원정에서 ${visitScore}-${homeScore} ${result}를 기록했습니다.`,
    `${home}는 ${formattedDate} 홈에서 열린 ${visit}와의 경기에서 ${homeScore}-${visitScore}로 ${result}했습니다.`,
  ];

  const { template, updatedLastUsed } = selectNonRepeatingTemplate(
    templates,
    lastUsedTemplates
  );
  lastUsedTemplates = updatedLastUsed;
  return template;
};

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
