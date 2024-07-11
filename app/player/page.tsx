import pitcherData from "../../public/data/pitcher_data.json";
import catcherData from "../../public/data/catcher_data.json";
import infielderData from "../../public/data/infielder_data.json";
import outfielderData from "../../public/data/outfielder_data.json";
import coachData from "../../public/data/coach_data.json";
import { TCoach, TPlayer } from "../types/player";
import PlayerItem from "@/components/playerComponets/PlayerItem";
import PlayerItemList from "@/components/playerComponets/PlayerItemList";
export default function Player() {
  return <PlayerItemList />;
}
