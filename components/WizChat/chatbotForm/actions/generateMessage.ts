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
