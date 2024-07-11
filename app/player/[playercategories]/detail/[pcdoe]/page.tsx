import BackBtn from "@/components/playerComponets/BackBtn";
import PlayerDetail from "@/components/playerComponets/PlayerDetail";

export default function DetailPage() {
  return (
    <div className="flex flex-col justify-center items-center mb-3 pt-12">
      <BackBtn />
      <PlayerDetail />
    </div>
  );
}
