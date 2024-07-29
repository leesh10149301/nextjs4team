import { calculateTalentData, predictPlayerRecordData } from "../helper";
import PlayerChart from "../PlayerChart";
import PredictPlayerChart from "../PredictPlayerChart";
import useDetailStore from "../zustand";

export default function PredictReport() {
  const { detailData, setDetailData } = useDetailStore();
  const position = detailData?.data?.gameplayer?.position;
  const talentData: (string | Number)[] = calculateTalentData({
    records: detailData?.data?.yearrecordlist,
    position: position,
  });
  const predictData: (string | Number)[][] = predictPlayerRecordData({
    pitcherRecords: detailData?.data?.recentgamerecordlist,
    records: detailData?.data?.yearrecordlist,
    position: position,
  });

  return (
    <div className="w-full  p-6 rounded-lg">
      <div className="flex justify-around">
        <div className="flex flex-col">
          <div className="flex items-center mb-8 text-lg font-bold">
            <div className="w-1 h-5 bg-[#d23933] mr-2" />
            선수 역량
          </div>
          <PlayerChart talentData={talentData} position={position} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center mb-8 text-lg font-bold">
            <div className="w-1 h-5 bg-[#d23933] mr-2" />
            다음 경기 확률 예측
          </div>
          <PredictPlayerChart predictData={predictData} position={position} />
        </div>
      </div>
    </div>
  );
}
