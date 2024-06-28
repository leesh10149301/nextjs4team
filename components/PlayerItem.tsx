import Link from "next/link"

type TPlayer = {
  playerName: string
  position: string
  backNumber: number
  playerPrvwImg: string
}

export default function PlayerItem({ player }: { player: TPlayer }) {
  return (
    <div className="ml-2 w-[300px] shadow-lg hover:shadow-xl rounded-lg transform transition-transform hover:scale-105">
      <Link href="/player" className="w-full">
        <img
          src={player.playerPrvwImg}
          alt={player.playerName}
          className="pt-5 w-full rounded-lg"
        />

        <div className="flex justify-between items-center p-2">
          <div className="">
            <p className="font-bold text-2xl">{player.playerName}</p>
            <p className="text-gray-500">{player.position}</p>
          </div>
          <p className="text-red-600 font-bold text-4xl">{player.backNumber}</p>
        </div>
      </Link>
    </div>
  )
}
