import { GameArticle } from "./GameArticle";

interface IWeekScheduleProps {}

export default function WeekSchedule(props: IWeekScheduleProps) {
  return (
    <div className="flex justify-between space-x-4">
      <GameArticle
        date="2024.7.13"
        team1="KT 위즈"
        team1Pitcher="엄상백"
        score="6 : 3"
        result="승"
        team2="롯데 자이언츠"
        team2Pitcher="구승민"
      />
      <GameArticle
        date="2024.7.14"
        team1="KT 위즈"
        team1Pitcher="조이현"
        score="0 : 0"
        result="취"
        team2="롯데 자이언츠"
        team2Pitcher="한현희"
      />
      <GameArticle
        date="2024.7.16"
        team1="KT 위즈"
        team1Pitcher="벤자민"
        score="VS"
        result="18:30 고척"
        team2="키움 히어로즈"
        team2Pitcher="후라도"
      />
    </div>
  );
}
