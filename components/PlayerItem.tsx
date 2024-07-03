import Link from "next/link"
import { TPlayer } from "../app/types/player"

export default function PlayerItem({
  player,
  pathName,
}: {
  player: TPlayer
  pathName: string
}) {
  return (
    <div className="ml-2 w-[23%]  shadow-lg hover:shadow-xl rounded-lg transform transition-transform hover:scale-105 my-5 mx-1">
      <Link
        href={`/player/${pathName}/detail/${player.pcode}`}
        className="w-[23%] "
      >
        <img
          src={player.playerPrvwImg}
          alt={player.playerName}
          className="pt-5 w-full rounded-lg min-h-[233px]"
          loading="lazy"
        />

        <div className="flex justify-between items-center p-2">
          <div className="">
            <p className="font-bold text-2xl">{player.playerName}</p>
            <p className="text-gray-500">{player.position}</p>
          </div>
          <p className="text-red-600 font-bold text-4xl">{player.backnum}</p>
        </div>
      </Link>
    </div>
  )
}
