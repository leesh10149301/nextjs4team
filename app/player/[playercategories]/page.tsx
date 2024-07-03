"use client"
import PlayerItemList from "../../../components/PlayerItemList"
import pitcherData from "../../../json/pitcher_data.json"
import catcherData from "../../../json/catcher_data.json"
import infielderData from "../../../json/infielder_data.json"
import outfielderData from "../../../json/outfielder_data.json"
import coachData from "../../../json/coach_data.json"
import { usePathname } from "next/navigation"
import { TPlayer, TCoach } from "../../types/player"
import { useMemo } from "react"

export default function CategoryPage() {
  const pathname = usePathname()
  let data: TPlayer[] | TCoach[] = useMemo(() => {
    switch (pathname.split("/").pop()) {
      case "team":
        return [
          ...pitcherData.data.list,
          ...catcherData.data.list,
          ...infielderData.data.list,
          ...outfielderData.data.list,
        ]
        break
      case "coach":
        return coachData.data.list
        break
      default:
        return []
    }
  }, [pathname.split("/").pop()])

  return (
    <>
      <PlayerItemList players={data} pathName={pathname.split("/").pop()} />
    </>
  )
}
