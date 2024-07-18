import { Yearrecordlist } from "@/app/types/player";
import { totalTableHeader } from "../helper";
import useDetailStore from "../zustand";

export default function TotalReport() {
  const { detailData, setDetailData } = useDetailStore();
  const position = detailData?.data?.gameplayer?.position;
  const totalThs = totalTableHeader(position);
  const totalTDs: Yearrecordlist[] = detailData?.data?.yearrecordlist;
  return (
    <>
      <div className="flex items-center mb-4 text-lg font-bold">
        <div className="w-1 h-5 bg-[#d23933] mr-2" />
        통산 기록 (kt)
      </div>
      <table className="w-full font-normal text-sm">
        <thead className="bg-[#d23933] text-white">
          <tr>
            {totalThs?.map((totalTh, idx) => (
              <th key={idx} className="py-1 min-w-[51px]">
                {totalTh}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {position === "투수"
            ? totalTDs?.map((totalTD, index) => (
                <tr key={index}>
                  <td className="border-b py-1 text-center">{totalTD.gyear}</td>
                  <td className="border-b py-1 text-center">
                    {totalTD.teamName}
                  </td>
                  <td className="border-b py-1 text-center">
                    {(
                      (totalTD.er / Number(totalTD.innDisplay.split(" ")[0])) *
                      9
                    ).toFixed(2)}
                  </td>
                  <td className="border-b py-1 text-center">
                    {totalTD.gamenum}
                  </td>
                  <td className="border-b py-1 text-center">{totalTD.wCg}</td>
                  <td className="border-b py-1 text-center">{totalTD.sho}</td>
                  <td className="border-b py-1 text-center">{totalTD.w}</td>
                  <td className="border-b py-1 text-center">{totalTD.l}</td>
                  <td className="border-b py-1 text-center">{totalTD.sv}</td>
                  <td className="border-b py-1 text-center">{totalTD.hold}</td>
                  <td className="border-b py-1 text-center">{totalTD.wra}</td>
                  <td className="border-b py-1 text-center">{totalTD.bf}</td>
                  <td className="border-b py-1 text-center">
                    {totalTD.innDisplay}
                  </td>
                  <td className="border-b py-1 text-center">{totalTD.hit}</td>
                  <td className="border-b py-1 text-center">{totalTD.hr}</td>
                  <td className="border-b py-1 text-center">{totalTD.bb}</td>
                  <td className="border-b py-1 text-center">{totalTD.hp}</td>
                  <td className="border-b py-1 text-center">{totalTD.kk}</td>
                  <td className="border-b py-1 text-center">{totalTD.r}</td>
                  <td className="border-b py-1 text-center">{totalTD.er}</td>
                </tr>
              ))
            : totalTDs?.map((totalTD, index) => (
                <tr key={index}>
                  <td className="border-b py-1 text-center">{totalTD.gyear}</td>
                  <td className="border-b py-1 text-center">
                    {totalTD.teamName}
                  </td>
                  <td className="border-b py-1 text-center">{totalTD.hra}</td>
                  <td className="border-b py-1 text-center">
                    {totalTD.gamenum}
                  </td>
                  <td className="border-b py-1 text-center">{totalTD.ab}</td>
                  <td className="border-b py-1 text-center">{totalTD.run}</td>
                  <td className="border-b py-1 text-center">{totalTD.hit}</td>
                  <td className="border-b py-1 text-center">{totalTD.h2}</td>
                  <td className="border-b py-1 text-center">{totalTD.h3}</td>
                  <td className="border-b py-1 text-center">{totalTD.hr}</td>
                  <td className="border-b py-1 text-center">{totalTD.rbi}</td>
                  <td className="border-b py-1 text-center">{totalTD.sb}</td>
                  <td className="border-b py-1 text-center">{totalTD.cs}</td>
                  <td className="border-b py-1 text-center">{totalTD.bb}</td>
                  <td className="border-b py-1 text-center">{totalTD.hp}</td>
                  <td className="border-b py-1 text-center">{totalTD.kk}</td>
                  <td className="border-b py-1 text-center">{totalTD.gd}</td>
                  <td className="border-b py-1 text-center">{totalTD.slg}</td>
                  <td className="border-b py-1 text-center">{totalTD.bra}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </>
  );
}
