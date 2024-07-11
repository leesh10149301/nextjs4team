import { TCoach, TPlayer } from "@/app/types/player";
import Link from "next/link";

export default function PlayerItem({ player }: { player: TPlayer | TCoach }) {
  const getPosition = (player) => {
    if (player.position.includes("코치") || player.position.includes("감독")) {
      return "coach";
    } else if (player.position.includes("내야수")) {
      return "infielder";
    } else if (player.position.includes("외야수")) {
      return "outfielder";
    } else if (player.position.includes("포수")) {
      return "catcher";
    } else if (player.position.includes("투수")) {
      return "pitcher";
    }
  };
  const playerPosition = getPosition(player);

  return (
    <div className="ml-2 w-[23%]  shadow-lg hover:shadow-xl rounded-lg transform transition-transform hover:scale-105 my-5 mx-1">
      <Link
        href={`/player/${playerPosition}/detail/${player.pcode}`}
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
  );
}
