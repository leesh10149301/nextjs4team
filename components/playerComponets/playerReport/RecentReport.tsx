import { TPRecentgamerecordlist } from "@/app/types/player";
import { recentTableHeader } from "../helper";
import useDetailStore from "../zustand";
export default function RecentReport() {
  const { detailData, setDetailData } = useDetailStore();
  const position = detailData?.data?.gameplayer?.position;
  const recentThs = recentTableHeader(position);
  const recentTds: TPRecentgamerecordlist[] =
    detailData?.data?.recentgamerecordlist;
  return (
    <>
      <div className="flex items-center mb-4 text-lg font-bold">
        <div className="w-1 h-5 bg-[#d23933] mr-2" />
        최근 경기
      </div>
      <table className="w-full font-normal text-sm">
        <thead className="bg-[#d23933] text-white">
          <tr>
            {recentThs?.map((recentTh, idx) => (
              <th key={idx} className=" w-20 py-1">
                {recentTh}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {position === "투수"
            ? recentTds?.map((recentTd, index) => (
                <tr key={index}>
                  <td className="border-b text-center py-1">
                    {recentTd.displayDate}
                  </td>
                  <td className="border-b text-center py-1">
                    {recentTd.matchTeamName}
                  </td>
                  <td
                    className={`${
                      recentTd.wls === "W"
                        ? "text-red-500 "
                        : recentTd.wls === "L"
                        ? "text-blue-500"
                        : ""
                    }  border-b text-center py-1`}
                  >
                    {recentTd.wls === " " || recentTd.wls === "S"
                      ? " "
                      : recentTd.wls}
                  </td>
                  <td className="border-b text-center py-1">{recentTd.wl}</td>
                  <td className="border-b text-center py-1">{recentTd.pa}</td>
                  <td className="border-b text-center py-1">{recentTd.bb}</td>
                  <td className="border-b text-center py-1">
                    {recentTd.innDisplay}
                  </td>
                  <td className="border-b text-center py-1">{recentTd.hit}</td>
                  <td className="border-b text-center py-1">{recentTd.hr}</td>
                  <td className="border-b text-center py-1">{recentTd.hp}</td>
                  <td className="border-b text-center py-1">{recentTd.kk}</td>
                  <td className="border-b text-center py-1">{recentTd.r}</td>
                  <td className="border-b text-center py-1">{recentTd.er}</td>
                </tr>
              ))
            : recentTds?.map((recentTd, index) => (
                <tr key={index}>
                  <td className="border-b text-center py-1">
                    {recentTd.displayDate}
                  </td>
                  <td className="border-b text-center py-1">
                    {recentTd.matchTeamName}
                  </td>
                  <td className="border-b text-center py-1">{recentTd.bra}</td>
                  <td className="border-b text-center py-1">{recentTd.ab}</td>
                  <td className="border-b text-center py-1">{recentTd.run}</td>
                  <td className="border-b text-center py-1">{recentTd.hit}</td>
                  <td className="border-b text-center py-1">{recentTd.h2}</td>
                  <td className="border-b text-center py-1">{recentTd.h3}</td>
                  <td className="border-b text-center py-1">{recentTd.hr}</td>
                  <td className="border-b text-center py-1">{recentTd.rbi}</td>
                  <td className="border-b text-center py-1">{recentTd.sb}</td>
                  <td className="border-b text-center py-1">{recentTd.cs}</td>
                  <td className="border-b text-center py-1">{recentTd.bb}</td>
                  <td className="border-b text-center py-1">{recentTd.hp}</td>
                  <td className="border-b text-center py-1">{recentTd.kk}</td>
                  <td className="border-b text-center py-1">{recentTd.gd}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </>
  );
}
