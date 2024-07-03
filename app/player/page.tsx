"use client"
import { usePathname } from "next/navigation"
import PlayerItemList from "../../components/PlayerItemList"
import pitcherData from "../../json/pitcher_data.json"

export default function Player() {
  const pathname = usePathname()
  const category = pathname.split("/").pop()

  console.log(category)
  const players = pitcherData.data.list
  return <div>player페이지</div>
}
