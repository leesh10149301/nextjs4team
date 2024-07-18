export type TCoach = {
  backnum: string;
  birth: string;
  career: string;
  gyear: string;
  height: string;
  heightWeight: string;
  hittype: string;
  mobilePlayerImg1: string;
  mobilePlayerImg2: string;
  orderSeq: string;
  pcode: string;
  playerName: string;
  playerPrvwImg: string;
  playerPrvwImg2: string;
  playerPrvwImg3: string;
  position: string;
  teamCode: string;
  teamName: string;
  weight: string;
};

export type TPlayer = {
  backnum: string;
  height: string;
  weight: string;
  birth: string;
  career: string;
  energybar: number;
  energybarName: string;
  gyear: string;
  hasFanpage: string;
  hittype: string;
  mobilePlayerImg: string;
  mobilePlayerImg1: string;
  mobilePlayerImg2: string;
  pcode: string;
  playerName: string;
  playerPrvwImg: string;
  playerPrvwImg2: string;
  position: string;
  rank: number;
  rankName: string;
  teamName: string;
};
export type TChartData = {
  data: TGamedata;
};
export type TGamedata = {
  gameplayer: Gameplayer;
  recentgamerecordlist: TPRecentgamerecordlist[];
  recentgamerecordlistfutures: Recentgamerecordlistfuture[];
  seasonsummary: Seasonsummary;
  seasonsummaryfutures: Seasonsummaryfutures;
  yearrecordlist: Yearrecordlist[];
};

export type Gameplayer = {
  backnum: string;
  birth: string;
  bloodGroups: string;
  bornPlace: string;
  career: string;
  career2: string;
  debutYear: string;
  energybar: number;
  energybarName: string;
  engName: string;
  gyear: string;
  hasFanpage: string;
  height: string;
  hittype: string;
  mobilePlayerImg: string;
  mobilePlayerImg1: string;
  mobilePlayerImg2: string;
  money: string;
  pcode: string;
  playerName: string;
  playerPrvwImg: string;
  playerPrvwImg1: string;
  playerPrvwImg2: string;
  playerPrvwImg3: string;
  position: string;
  position2: string;
  promise: string;
  rank: number;
  rankName: string;
  teamCode: string;
  teamName: string;
  weight: string;
};

export type TPRecentgamerecordlist = {
  slg: number;
  hra: number;
  ab: number;
  gd: number;
  rbi: number;
  sb: number;
  cs: number;
  h2: number;
  h3: number;
  bra: number;
  run: number;
  bb: number;
  displayDate: string;
  er: number;
  hit: number;
  hp: number;
  hr: number;
  inn2: number;
  innDisplay: string;
  kk: number;
  matchTeamCode: string;
  matchTeamName: string;
  oavg: string;
  pa: number;
  r: number;
  sv: number;
  wl: string;
  wls: string;
};

export type Recentgamerecordlistfuture = {
  bb: number;
  displayDate: string;
  er: number;
  hit: number;
  hp: number;
  hr: number;
  inn2: number;
  innDisplay: string;
  kk: number;
  matchTeamCode: string;
  matchTeamName: string;
  pa: number;
  r: number;
  sv: number;
  wl: string;
  wls: string;
};

export type Seasonsummary = {
  cs: number;
  rbi: number;
  run: number;
  babip: string;
  bb: number;
  bf: number;
  bk: number;
  bs: number;
  er: number;
  era: string;
  err: number;
  fip: string;
  fo: number;
  gamenum: number;
  go: number;
  gyear: string;
  havg: string;
  hit: number;
  hold: number;
  hp: number;
  hr: number;
  ib: number;
  inn2: number;
  innDisplay: string;
  kbb: string;
  kk: number;
  l: number;
  oavg: string;
  pcode: string;
  playerName: string;
  qs: number;
  qsPlus: number;
  r: number;
  ravg: string;
  sf: number;
  sh: number;
  sho: number;
  start: number;
  sv: number;
  svo: number;
  tugucount: number;
  turfSave: number;
  w: number;
  wCg: number;
  war: string;
  whip: string;
  winShares: string;
  wl: string;
  wp: number;
  wra: string;
};

export type Seasonsummaryfutures = {
  bb: number;
  er: number;
  era: string;
  err: number;
  gamenum: number;
  gyear: string;
  hit: number;
  hold: number;
  hp: number;
  hr: number;
  inn2: number;
  innDisplay: string;
  kk: number;
  l: number;
  pcode: string;
  playerName: string;
  r: number;
  sv: number;
  w: number;
  wl: string;
  wra: string;
};

export type Yearrecordlist = {
  oavg: number;
  rbi: number;
  cs: number;
  gd: number;
  sb: number;
  slg: number;
  run: number;
  h2: number;
  h3: number;
  ab: number;
  bra: number;
  hra: number;
  bb: number;
  bf: number;
  er: number;
  era: string;
  gamenum: number;
  gyear: string;
  hit: number;
  hold: number;
  hp: number;
  hr: number;
  inn2: number;
  innDisplay: string;
  kk: number;
  l: number;
  r: number;
  sho: number;
  sv: number;
  teamCode: string;
  teamName: string;
  w: number;
  wCg: number;
  wra: string;
};
