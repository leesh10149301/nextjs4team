import { TPRecentgamerecordlist, Yearrecordlist } from "../types/player";

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
