"use client";

import { TCoach, TPlayer } from "@/lib/types/player";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useDetailStore from "@/lib/stores/playerDetailStore";
import RecentReport from "./playerReport/RecentReport";
import TotalReport from "./playerReport/TotalReport";
import PredictReport from "./playerReport/PredictReport";
export default function PlayerDetail() {
  const { allTeamData, setDetailData } = useDetailStore();
  const [checkBtn, setCheckBtn] = useState("recent");
  const pathname = usePathname();
  const pcode: string = pathname.split("/").pop();
  const filterData: (TPlayer | TCoach)[] = allTeamData.filter(
    (data): data is TPlayer | TCoach => data.pcode === pcode
  );

  if (filterData.length === 0) {
    return <div>No data found</div>;
  }
  const data = filterData[0];

  //여기는 차트 데이터
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/player_info?pcode=${pcode}`);
        const data = await response.json();
        setDetailData(data);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, [pathname]);
  return (
    <>
      <div className="w-[1200px] pt-6 mb-20">
        <div className="w-full relative flex justify-center h-[465px]">
          <img src={data.playerPrvwImg2} className="w-full rounded-xl" />
          <div className="absolute top-[31.2%] left-[36%]">
            <div className="flex flex-col text-white">
              <span className="text-[#c00000] text-3xl mb-2 font-bold">
                No. {data.backnum}
              </span>
              <span className="text-5xl mb-3 font-bold">{data.playerName}</span>
              <span>
                {data.position} / {data.hittype}
              </span>
            </div>
          </div>
          <div>
            <div className="absolute top-[35%] text-white left-[65%]">
              <ul>
                <li className="flex ">
                  <div className=" w-16 mr-2 mb-2">생년월일</div>
                  <div>
                    {data.birth.split(".")[0]}년 {data.birth.split(".")[1]}월{" "}
                    {data.birth.split(".")[2]}일
                  </div>
                </li>
                <li className="flex ">
                  <div className=" w-16 mr-2 mb-2">프로입단</div>
                  <div>{data.gyear}년</div>
                </li>
                <li className="flex ">
                  <div className=" w-16 mr-2 mb-2">신장/체중</div>
                  <div>
                    {data.height}cm / {data.weight}kg
                  </div>
                </li>
                <li className="flex">
                  <div className=" w-16 mr-2 mb-2">소속</div>
                  <div className=" w-72">{data.career}</div>
                </li>
              </ul>
            </div>
            <button className="w-[550px] absolute bottom-0 left-[50%] text-white mb-4">
              photo
            </button>
          </div>
        </div>
      </div>
      {pathname.includes("coach") ? (
        <div className="mb-20"></div>
      ) : (
        <>
          <div className=" w-full flex justify-center">
            <div className="w-[1200px] border-t-2">
              <ul className=" w-full flex gap-2">
                {[
                  ["최근 5경기", "recent"],
                  ["통산기록", "total"],
                  ["선수 경기 예측", "predict"],
                ].map((title, index) => (
                  <li className=" p-4" key={index}>
                    <button
                      onClick={() => setCheckBtn(title[1])}
                      className={`${
                        checkBtn === title[1]
                          ? "border-b-2 border-[#d60c0c] pb-2"
                          : ""
                      } text-gray-700 hover:text-black`}
                    >
                      {title[0]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-[1200px] p-5 flex flex-col items-start mb-20">
            {checkBtn === "recent" ? <RecentReport /> : null}
            {checkBtn === "total" ? <TotalReport /> : null}
            {checkBtn === "predict" ? <PredictReport /> : null}
          </div>
        </>
      )}
    </>
  );
}
