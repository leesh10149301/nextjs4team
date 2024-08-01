import { create } from "zustand";
import { TChartData, TCoach, TPlayer } from "@/lib/types/player";
import pitcherData from "../../public/data/pitcher_data.json";
import catcherData from "../../public/data/catcher_data.json";
import infielderData from "../../public/data/infielder_data.json";
import outfielderData from "../../public/data/outfielder_data.json";
import coachData from "../../public/data/coach_data.json";

interface StoreState {
  detailData: TChartData | null;
  setDetailData: (data: TChartData) => void;
  allTeamData: (TPlayer | TCoach)[];
}

const useDetailStore = create<StoreState>((set) => ({
  detailData: null,
  setDetailData: (data) => set({ detailData: data }),
  allTeamData: [
    ...pitcherData.data.list,
    ...catcherData.data.list,
    ...infielderData.data.list,
    ...outfielderData.data.list,
    ...coachData.data.list,
  ],
}));

export default useDetailStore;
