import PlayerItem from "../../components/PlayerItem"
const data = {
  playerName: "string",
  position: "string",
  backNumber: 1,
  playerPrvwImg: "/",
}
export default function Player() {
  return <PlayerItem player={data} />
}
