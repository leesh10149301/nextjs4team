import { TPRecentgamerecordlist, Yearrecordlist } from "@/lib/types/player";

export const recentTableHeader = (position: string) => {
  if (position === "투수") {
    return [
      "일자",
      "상대",
      "결과",
      "점수",
      "타자",
      "볼넷",
      "이닝",
      "피안타",
      "피홈런",
      "사구",
      "탈삼진",
      "실점",
      "자책점",
    ];
  } else {
    return [
      "일자",
      "상대",
      "타율",
      "타수",
      "득점",
      "안타",
      "2루타",
      "3루타",
      "홈런",
      "타점",
      "도루",
      "도실",
      "볼넷",
      "사구",
      "삼진",
      "병살",
    ];
  }
};
export const totalTableHeader = (position: string) => {
  if (position === "투수") {
    return [
      "연도",
      "팀",
      "평균자책점",
      "경기",
      "완투",
      "완봉",
      "승",
      "패",
      "세",
      "홀",
      "승률",
      "타자",
      "이닝",
      "피안타",
      "피홈런",
      "볼넷",
      "사구",
      "탈삼진",
      "실점",
      "자책점",
    ];
  } else {
    return [
      "연도",
      "팀",
      "타율",
      "경기",
      "타수",
      "득점",
      "안타",
      "2루타",
      "3루타",
      "홈런",
      "타점",
      "도루",
      "도실",
      "볼넷",
      "사구",
      "삼진",
      "병살",
      "장타율",
      "출루율",
    ];
  }
};

export const calculateTalentData = ({
  records,
  position,
}: {
  records: Yearrecordlist[];
  position: string;
}) => {
  const talentData = {
    inn: 0,
    er: 0,
    kk: 0,
    bf: 0,
    run: 0,
    hit: 0,
    bb: 0,
    hr: 0,
    hp: 0,
    ab: 0,
    slg: 0,
    bra: 0,
    hra: 0,
  };
  position === "투수"
    ? records?.forEach((record) => {
        talentData.er += Number(record.er);
        talentData.inn += Number(record.inn2);
        talentData.kk += Number(record.kk);
        talentData.hit += Number(record.hit);
        talentData.bb += Number(record.bb);
        talentData.bf += Number(record.bf);
        talentData.hp += Number(record.hp);
      })
    : records?.forEach((record) => {
        talentData.run += Number(record.run);
        talentData.hit += Number(record.hit);
        talentData.bb += Number(record.bb);
        talentData.hr += Number(record.hr);
        talentData.ab += Number(record.ab);
        talentData.slg += Number(record.slg);
        talentData.bra += Number(record.bra);
        talentData.hra += Number(record.hra);
      });

  return position === "투수"
    ? [
        talentData.er / (talentData.inn / 9) / records.length,
        talentData.kk / (talentData.inn / 9) / records.length,
        talentData.bb / (talentData.inn / 9) / records.length,

        talentData.hit / talentData.bf / records.length,
        (talentData.hit + talentData.bb + talentData.hp) /
          talentData.bf /
          records.length,
      ]
    : [
        talentData.run / talentData.ab / records.length,
        (talentData.slg / records.length).toFixed(3),
        (talentData.bra / records.length).toFixed(3),
        (talentData.hra / records.length).toFixed(3),
        talentData.hr / talentData.ab,
      ];
};

export const predictPlayerRecordData = ({
  pitcherRecords,
  records,
  position,
}: {
  pitcherRecords: TPRecentgamerecordlist[];
  records: Yearrecordlist[];
  position: string;
}): (string | Number)[][] => {
  const pitcherPredictData = {
    oba: 0,
    whip: 0,
    kkbb: 0,
    earnRunAvg: 0,
    ba: 0,
    bra: 0,
    hit: 0,
  };
  const predictData = {
    hra: 0,
    bra: 0,
    slg: 0,
    hr: 0,
  };
  if (position === "투수") {
    pitcherRecords?.forEach((record) => {
      pitcherPredictData.earnRunAvg +=
        (Number(record.er) * 9) / Number(record.inn2);
      pitcherPredictData.whip +=
        (Number(record.bb) + Number(record.hit)) / Number(record.inn2);
      if (record.bb === 0) {
        pitcherPredictData.kkbb += Number(record.kk) / 1;
      } else {
        pitcherPredictData.kkbb += Number(record.kk) / Number(record.bb);
      }
      pitcherPredictData.oba += Number(record.hit) / Number(record.pa);
    });

    return [
      [
        "ERA",
        (pitcherPredictData.earnRunAvg / pitcherRecords.length).toFixed(2),
      ],
      ["WHIP", (pitcherPredictData.whip / pitcherRecords.length).toFixed(2)],
      ["KK/BB", (pitcherPredictData.kkbb / pitcherRecords.length).toFixed(2)],
      ["OBA", (pitcherPredictData.oba / pitcherRecords.length).toFixed(2)],
    ];
  } else {
    records?.forEach((record) => {
      predictData.hra += Number(record.hra);
      predictData.bra += Number(record.bra);
      predictData.slg += Number(record.slg);
      predictData.hr += Number(record.hr);
    });

    return [
      ["BA", (predictData.hra / records.length).toFixed(2)],
      ["OBP", (predictData.bra / records.length).toFixed(2)],
      ["SLG", (predictData.slg / records.length).toFixed(2)],
      ["HR", predictData.hr / records.length],
    ];
  }
};
