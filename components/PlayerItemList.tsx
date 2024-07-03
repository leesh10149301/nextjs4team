import { TCoach, TPlayer } from "../app/types/player"
import PlayerItem from "./PlayerItem"
export default function PlayerItemList({
  players,
  pathName,
}: {
  players: TPlayer[] | TCoach[]
  pathName: string
}) {
  return (
    <div className="w-full flex justify-center p-2 mb-10">
      <div className="flex flex-wrap w-[1100px]">
        {players.map((player) => (
          <PlayerItem player={player} key={player.pcode} pathName={pathName} />
        ))}
      </div>
    </div>
  )
}
