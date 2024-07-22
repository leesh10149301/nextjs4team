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
export default function PlayerItemList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
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
        break;
      case "pitcher":
        return pitcherData.data.list;
        break;
      case "catcher":
        return catcherData.data.list;
        break;
      case "infielder":
        return infielderData.data.list;
        break;
      case "outfielder":
        return outfielderData.data.list;
        break;
      case "coach":
        return coachData.data.list;
        break;
      default:
        return [];
    }
  }, [pathname]);
  //지우기

  useEffect(() => {
    if (searchTerm === "") {
      setFilterData(data);
    } else {
      //플레이어
      const filtered = searchData.filter((player) =>
        player.playerName.includes(searchTerm)
      );
      setFilterData(filtered);
    }
  }, [searchTerm, data]);
  console.log(filterData.length);
  return (
    <>
      <PlayerRole searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="w-full flex justify-center p-2 mb-10">
        <div className="flex flex-wrap w-[1100px]">
          {filterData.length === 0 ? (
            <div className="flex justify-center w-full py-32 ">
              <p className="font-bold text-3xl text-[#d60c0c]">
                검색 결과가 없습니다.
              </p>
            </div>
          ) : (
            filterData.map((player) => (
              <PlayerItem player={player} key={player.pcode} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
