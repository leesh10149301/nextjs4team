"use client";
import PlayerChart from "@/components/playerComponets/PlayerChart";
import pitcherData from "../../public/data/pitcher_data.json";
import catcherData from "../../public/data/catcher_data.json";
import infielderData from "../../public/data/infielder_data.json";
import outfielderData from "../../public/data/outfielder_data.json";
import coachData from "../../public/data/coach_data.json";
import {
  TPRecentgamerecordlist,
  TChartData,
  TCoach,
  TPlayer,
} from "@/app/types/player";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface PlayerStats {
  year: number;
  team: string;
  battingAverage: number;
  onBasePercentage: number;
  sluggingPercentage: number;
}

// 주어진 데이터
const playerStats: PlayerStats[] = [
  {
    year: 2018,
    team: "KT",
    battingAverage: 0.29,
    onBasePercentage: 0.356,
    sluggingPercentage: 0.524,
  },
  {
    year: 2019,
    team: "KT",
    battingAverage: 0.336,
    onBasePercentage: 0.416,
    sluggingPercentage: 0.495,
  },
  {
    year: 2020,
    team: "KT",
    battingAverage: 0.33,
    onBasePercentage: 0.411,
    sluggingPercentage: 0.544,
  },
  {
    year: 2021,
    team: "KT",
    battingAverage: 0.347,
    onBasePercentage: 0.45,
    sluggingPercentage: 0.521,
  },
  {
    year: 2022,
    team: "KT",
    battingAverage: 0.245,
    onBasePercentage: 0.312,
    sluggingPercentage: 0.371,
  },
  {
    year: 2023,
    team: "KT",
    battingAverage: 0.265,
    onBasePercentage: 0.347,
    sluggingPercentage: 0.416,
  },
  {
    year: 2024,
    team: "KT",
    battingAverage: 0.315,
    onBasePercentage: 0.378,
    sluggingPercentage: 0.559,
  },
];
const fiveTableHeader = (pathname: string) => {
  if (pathname.includes("pitcher")) {
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

export default function PlayerDetail() {
  const [nextSeasonPrediction, setNextSeasonPrediction] =
    useState<PlayerStats | null>(null);
  const [checkBtn, setCheckBtn] = useState("recent");
  const [chartData, setChartData] = useState<TChartData | null>(null);
  const pathname = usePathname();
  const pcode: string = pathname.split("/").pop();
  const recentThs = fiveTableHeader(pathname);
  const recentTDs: TPRecentgamerecordlist[] =
    chartData?.data.recentgamerecordlist;

  const allTeamData: (TPlayer | TCoach)[] = [
    ...pitcherData.data.list,
    ...catcherData.data.list,
    ...infielderData.data.list,
    ...outfielderData.data.list,
    ...coachData.data.list,
  ];

  const filterData: (TPlayer | TCoach)[] = allTeamData.filter(
    (data): data is TPlayer | TCoach => data.pcode === pcode
  );

  if (filterData.length === 0) {
    return <div>No data found</div>;
  }

  //여기는 차트 데이터
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://3.35.50.52:5002/player_data?pcode=${pathname
            .split("/")
            .pop()}`
        );
        const data = await response.json();
        await setChartData(data);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, [pathname]);

  //여기는 선수 경기 예측
  const data = filterData[0];
  const predictNextSeasonStats = () => {
    const recentStats = playerStats.slice(-3); // 최근 3시즌 데이터를 기준으로 평균 계산
    const avgBattingAverage =
      recentStats.reduce((acc, curr) => acc + curr.battingAverage, 0) /
      recentStats.length;
    const avgOnBasePercentage =
      recentStats.reduce((acc, curr) => acc + curr.onBasePercentage, 0) /
      recentStats.length;
    const avgSluggingPercentage =
      recentStats.reduce((acc, curr) => acc + curr.sluggingPercentage, 0) /
      recentStats.length;

    // 다음 시즌 예측
    const nextYear = recentStats[recentStats.length - 1].year + 1;
    const nextSeasonPrediction: PlayerStats = {
      year: nextYear,
      team: "KT", // 특정 팀으로 고정된 예시이므로 실제 데이터에 맞게 수정 필요
      battingAverage: avgBattingAverage,
      onBasePercentage: avgOnBasePercentage,
      sluggingPercentage: avgSluggingPercentage,
    };

    setNextSeasonPrediction(nextSeasonPrediction);
  };

  return (
    <>
      <div className="w-[1100px] pt-6 mb-20">
        <div className="w-full relative flex justify-center h-[465px]">
          <img src={data.playerPrvwImg2} />
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
            <div
              className={`absolute ${
                pathname.includes("coach") ? "top-[35%] " : "top-[20%] "
              }text-white left-[65%]`}
            >
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
            <div className="absolute bottom-12 left-[58%] text-blue-200 ">
              {pathname.includes("coach") ? null : <PlayerChart />}
            </div>
            <div className="absolute bottom-0 left-[70%] text-white mb-4">
              여기에 사진 버튼?
            </div>
          </div>
        </div>
      </div>
      {pathname.includes("coach") ? null : (
        <>
          <div className=" w-full flex justify-center">
            <div className="w-[1100px] border-t-2">
              <ul className=" w-full flex gap-2">
                <li className=" p-4">
                  <button
                    onClick={() => setCheckBtn("recent")}
                    className={`${
                      checkBtn === "recent"
                        ? "border-b-2 border-[#d60c0c] pb-2"
                        : ""
                    } text-gray-700 hover:text-black`}
                  >
                    최근 5경기
                  </button>
                </li>
                <li className=" p-4">
                  <button
                    onClick={() => setCheckBtn("total")}
                    className={`${
                      checkBtn === "total"
                        ? "border-b-2 border-[#d60c0c] pb-2"
                        : ""
                    } text-gray-700 hover:text-black`}
                  >
                    통산기록
                  </button>
                </li>
                <li className=" p-4">
                  <button
                    onClick={() => setCheckBtn("predict")}
                    className={`${
                      checkBtn === "predict"
                        ? "border-b-2 border-[#d60c0c] pb-2"
                        : ""
                    } text-gray-700 hover:text-black`}
                  >
                    선수 경기 예측
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div
            style={{
              width: "1100px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            {checkBtn === "recent" ? (
              <>
                <div className="flex items-center mb-4 text-lg font-bold">
                  <div className="w-1 h-5 bg-[#d23933] mr-2" />
                  최근 경기
                </div>
                <table className="w-full font-normal">
                  <thead>
                    <tr>
                      {recentThs?.map((recentTh, idx) => (
                        <th key={idx} className="border-2 w-20">
                          {recentTh}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pathname.includes("pitcher")
                      ? recentTDs?.map((recentTD, index) => (
                          <tr key={index}>
                            <td className="border text-center">
                              {recentTD.displayDate}
                            </td>
                            <td className="border text-center">
                              {recentTD.matchTeamName}
                            </td>
                            <td
                              className={`${
                                recentTD.wls === "W"
                                  ? "text-red-500 "
                                  : recentTD.wls === "L"
                                  ? "text-blue-500"
                                  : ""
                              }  border text-center`}
                            >
                              {recentTD.wls === " " || recentTD.wls === "S"
                                ? " "
                                : recentTD.wls}
                            </td>
                            <td className="border text-center">
                              {recentTD.wl}
                            </td>
                            <td className="border text-center">
                              {recentTD.pa}
                            </td>
                            <td className="border text-center">
                              {recentTD.bb}
                            </td>
                            <td className="border text-center">
                              {recentTD.innDisplay}
                            </td>
                            <td className="border text-center">
                              {recentTD.hit}
                            </td>
                            <td className="border text-center">
                              {recentTD.hr}
                            </td>
                            <td className="border text-center">
                              {recentTD.hp}
                            </td>
                            <td className="border text-center">
                              {recentTD.kk}
                            </td>
                            <td className="border text-center">{recentTD.r}</td>
                            <td className="border text-center">
                              {recentTD.er}
                            </td>
                          </tr>
                        ))
                      : recentTDs?.map((recentTD, index) => (
                          <tr key={index}>
                            <td className="border text-center">
                              {recentTD.displayDate}
                            </td>
                            <td className="border text-center">
                              {recentTD.matchTeamName}
                            </td>
                            <td className="border text-center">
                              {recentTD.bra}
                            </td>
                            <td className="border text-center">
                              {recentTD.ab}
                            </td>
                            <td className="border text-center">
                              {recentTD.run}
                            </td>
                            <td className="border text-center">
                              {recentTD.hit}
                            </td>
                            <td className="border text-center">
                              {recentTD.h2}
                            </td>
                            <td className="border text-center">
                              {recentTD.h3}
                            </td>
                            <td className="border text-center">
                              {recentTD.hr}
                            </td>
                            <td className="border text-center">
                              {recentTD.rbi}
                            </td>
                            <td className="border text-center">
                              {recentTD.sb}
                            </td>
                            <td className="border text-center">
                              {recentTD.cs}
                            </td>
                            <td className="border text-center">
                              {recentTD.bb}
                            </td>
                            <td className="border text-center">
                              {recentTD.hp}
                            </td>
                            <td className="border text-center">
                              {recentTD.kk}
                            </td>
                            <td className="border text-center">
                              {recentTD.gd}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </>
            ) : null}
            {checkBtn === "predict" ? (
              <div className="w-full">
                <div className="flex items-center mb-8 text-lg font-bold">
                  <div className="w-1 h-5 bg-[#d23933] mr-2" />
                  선수 성적 예측
                </div>

                <div className=" flex justify-around">
                  <div className="w-64 bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-bold"> 다음 경기 예측 </h2>
                    <div className="mt-4">
                      <p>
                        <span className="font-bold">다음 시즌:</span>{" "}
                        {nextSeasonPrediction?.year}
                      </p>
                      <p>
                        <span className="font-bold">팀:</span>{" "}
                        {nextSeasonPrediction?.team}
                      </p>
                      <p>
                        <span className="font-bold">평균 타율:</span>{" "}
                        {nextSeasonPrediction?.battingAverage.toFixed(3)}
                      </p>
                      <p>
                        <span className="font-bold">출루율:</span>{" "}
                        {nextSeasonPrediction?.onBasePercentage.toFixed(3)}
                      </p>
                      <p>
                        <span className="font-bold">장타율:</span>{" "}
                        {nextSeasonPrediction?.sluggingPercentage.toFixed(3)}
                      </p>
                    </div>
                  </div>
                  <div className="w-64 bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-bold"> 2024년 경기 예측 </h2>
                    <div className="mt-4">
                      <p>
                        <span className="font-bold">다음 시즌:</span>{" "}
                        {nextSeasonPrediction.year}
                      </p>
                      <p>
                        <span className="font-bold">팀:</span>{" "}
                        {nextSeasonPrediction.team}
                      </p>
                      <p>
                        <span className="font-bold">평균 타율:</span>{" "}
                        {nextSeasonPrediction.battingAverage.toFixed(3)}
                      </p>
                      <p>
                        <span className="font-bold">출루율:</span>{" "}
                        {nextSeasonPrediction.onBasePercentage.toFixed(3)}
                      </p>
                      <p>
                        <span className="font-bold">장타율:</span>{" "}
                        {nextSeasonPrediction.sluggingPercentage.toFixed(3)}
                      </p>
                    </div>
                  </div>
                  <div className="w-64 bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-bold"> 2025년 경기 예측 </h2>
                    <div className="mt-4">
                      <p>
                        <span className="font-bold">다음 시즌:</span>{" "}
                        {nextSeasonPrediction.year}
                      </p>
                      <p>
                        <span className="font-bold">팀:</span>{" "}
                        {nextSeasonPrediction.team}
                      </p>
                      <p>
                        <span className="font-bold">평균 타율:</span>{" "}
                        {nextSeasonPrediction.battingAverage.toFixed(3)}
                      </p>
                      <p>
                        <span className="font-bold">출루율:</span>{" "}
                        {nextSeasonPrediction.onBasePercentage.toFixed(3)}
                      </p>
                      <p>
                        <span className="font-bold">장타율:</span>{" "}
                        {nextSeasonPrediction.sluggingPercentage.toFixed(3)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </>
      )}
    </>
  );
}
