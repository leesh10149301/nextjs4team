"use client";

import pitcherData from "../../public/data/pitcher_data.json";
import catcherData from "../../public/data/catcher_data.json";
import infielderData from "../../public/data/infielder_data.json";
import outfielderData from "../../public/data/outfielder_data.json";
import coachData from "../../public/data/coach_data.json";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { TCoach, TPlayer } from "@/app/types/player";
import PlayerItem from "./PlayerItem";
import PlayerRole from "./PlayerRole";

const ITEMS_PER_PAGE = 8;

export default function PlayerItemList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState<(TPlayer | TCoach)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pathname = usePathname();

  const sortByPlayerName = (a: TPlayer | TCoach, b: TPlayer | TCoach) => {
    return a.playerName.localeCompare(b.playerName, "ko");
  };

  const searchData = [
    ...pitcherData.data.list,
    ...catcherData.data.list,
    ...infielderData.data.list,
    ...outfielderData.data.list,
    ...coachData.data.list,
  ];

  let data: (TPlayer | TCoach)[] = useMemo(() => {
    switch (pathname.split("/").pop()) {
      case "player":
        return [
          ...pitcherData.data.list,
          ...catcherData.data.list,
          ...infielderData.data.list,
          ...outfielderData.data.list,
          ...coachData.data.list,
        ];
      case "team":
        return [
          ...pitcherData.data.list,
          ...catcherData.data.list,
          ...infielderData.data.list,
          ...outfielderData.data.list,
        ].sort(sortByPlayerName);
      case "pitcher":
        return pitcherData.data.list;
      case "catcher":
        return catcherData.data.list;
      case "infielder":
        return infielderData.data.list;
      case "outfielder":
        return outfielderData.data.list;
      case "coach":
        return coachData.data.list;
      default:
        return [];
    }
  }, [pathname]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilterData(data);
    } else {
      const filtered = searchData.filter((player) =>
        player.playerName.includes(searchTerm)
      );
      setFilterData(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, data]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageData = filterData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filterData.length / ITEMS_PER_PAGE);

  return (
    <>
      <PlayerRole searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="w-full flex justify-center p-2 mb-2">
        <div className="flex flex-wrap w-[1100px]">
          {currentPageData.length === 0 ? (
            <div className="flex justify-center w-full py-32 ">
              <p className="font-bold text-3xl text-[#d60c0c]">
                검색 결과가 없습니다.
              </p>
            </div>
          ) : (
            currentPageData.map((player) => (
              <PlayerItem player={player} key={player.pcode} />
            ))
          )}
        </div>
      </div>
      <div className="w-full flex justify-center mb-10">
        <div className="flex gap-1 items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 ${currentPage === 1 ? "text-gray-200" : ""}`}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <span className="px-4 py-2 \ bg-white">{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 ${
              currentPage === totalPages ? "text-gray-200" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
}
