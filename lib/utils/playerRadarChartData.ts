import { Yearrecordlist } from "../types/player";

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
