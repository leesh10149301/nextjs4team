import { TPRecentgamerecordlist } from "@/lib/types/player";
import useDetailStore from "@/lib/stores/playerDetailStore";
import { recentTableHeader } from "@/lib/utils/helper";
export default function RecentReport() {
  const { detailData } = useDetailStore();
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
        <thead className="bg-[#d23933] text-white border border-b-0 border-[#d23933]">
          <tr>
            {recentThs?.map((recentTh, idx) => (
              <th key={idx} className=" w-20 py-2">
                {recentTh}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {recentTds?.length === 0 ? (
            <tr>
              <td
                className="text-center py-10 border border-t-0 font-bold"
                colSpan={recentThs.length}
              >
                경기 기록이 없습니다.
              </td>
            </tr>
          ) : position === "투수" ? (
            recentTds?.map((recentTd, index) => (
              <tr key={index}>
                <td className="border-b text-center py-2">
                  {recentTd.displayDate}
                </td>
                <td className="border-b text-center py-2">
                  {recentTd.matchTeamName}
                </td>
                <td
                  className={`${
                    recentTd.wls === "W"
                      ? "text-red-500 "
                      : recentTd.wls === "L"
                      ? "text-blue-500"
                      : ""
                  }  border-b text-center py-2`}
                >
                  {recentTd.wls === " " || recentTd.wls === "S"
                    ? " "
                    : recentTd.wls}
                </td>
                <td className="border-b text-center py-2">{recentTd.wl}</td>
                <td className="border-b text-center py-2">{recentTd.pa}</td>
                <td className="border-b text-center py-2">{recentTd.bb}</td>
                <td className="border-b text-center py-2">
                  {recentTd.innDisplay}
                </td>
                <td className="border-b text-center py-2">{recentTd.hit}</td>
                <td className="border-b text-center py-2">{recentTd.hr}</td>
                <td className="border-b text-center py-2">{recentTd.hp}</td>
                <td className="border-b text-center py-2">{recentTd.kk}</td>
                <td className="border-b text-center py-2">{recentTd.r}</td>
                <td className="border-b text-center py-2">{recentTd.er}</td>
              </tr>
            ))
          ) : (
            recentTds?.map((recentTd, index) => (
              <tr key={index}>
                <td className="border-b text-center py-2">
                  {recentTd.displayDate}
                </td>
                <td className="border-b text-center py-2">
                  {recentTd.matchTeamName}
                </td>
                <td className="border-b text-center py-2">{recentTd.bra}</td>
                <td className="border-b text-center py-2">{recentTd.ab}</td>
                <td className="border-b text-center py-2">{recentTd.run}</td>
                <td className="border-b text-center py-2">{recentTd.hit}</td>
                <td className="border-b text-center py-2">{recentTd.h2}</td>
                <td className="border-b text-center py-2">{recentTd.h3}</td>
                <td className="border-b text-center py-2">{recentTd.hr}</td>
                <td className="border-b text-center py-2">{recentTd.rbi}</td>
                <td className="border-b text-center py-2">{recentTd.sb}</td>
                <td className="border-b text-center py-2">{recentTd.cs}</td>
                <td className="border-b text-center py-2">{recentTd.bb}</td>
                <td className="border-b text-center py-2">{recentTd.hp}</td>
                <td className="border-b text-center py-2">{recentTd.kk}</td>
                <td className="border-b text-center py-2">{recentTd.gd}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
