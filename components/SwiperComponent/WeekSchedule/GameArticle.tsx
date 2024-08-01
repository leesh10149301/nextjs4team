import dayjs from "dayjs";
import { IGameArticleProps } from ".";

const emblemMap: { [key: string]: string } = {
  "OB": "/icons/emblems/dosan_emblem.png",
  "HH": "/icons/emblems/hanhwa_emblem.png",
  "HT": "/icons/emblems/kia_emblem.png",
  "WO": "/icons/emblems/kiwoom_emblem.png",
  "KT": "/icons/emblems/kt_emblem.png",
  "LG": "/icons/emblems/lg_emblem.png",
  "LT": "/icons/emblems/lotte_emblem.png",
  "NC": "/icons/emblems/nc_emblem.png",
  "SM": "/icons/emblems/sm_emblem.png",
  "SS": "/icons/emblems/ss_emblem.png",
  "SK": "/icons/emblems/ssg_emblem.png",
};

const formatDateString = (dateString: string): string => {
  if (!dateString) return "";
  return dayjs(dateString, "YYYYMMDD").format("YYYY.MM.DD");
};
export function GameArticle(props: IGameArticleProps) {
  const isToday = props.game === "current" ? "bg-[#ec0a0b]" : "bg-black";

  // 'kt'가 home이나 visit에 있는 경우 항상 team1 위치에 오도록 설정
  const isKtVisit = props.visitKey === "KT";

  const team1 = isKtVisit
    ? {
        name: props.visit,
        key: props.visitKey,
        starter: props.visitStarter,
        decision: props.visitDecision,
        score: props.visitScore,
        decisionPitcher: props.visitDecisionPitcher,
      }
    : {
        name: props.home,
        key: props.homeKey,
        starter: props.homeStarter,
        decision: props.homeDecision,
        score: props.homeScore,
        decisionPitcher: props.homeDecisionPitcher,
      };

  const team2 = isKtVisit
    ? {
        name: props.home,
        key: props.homeKey,
        starter: props.homeStarter,
        decision: props.homeDecision,
        score: props.homeScore,
        decisionPitcher: props.homeDecisionPitcher,
      }
    : {
        name: props.visit,
        key: props.visitKey,
        starter: props.visitStarter,
        decision: props.visitDecision,
        score: props.visitScore,
        decisionPitcher: props.visitDecisionPitcher,
      };

  const getPitcherInfo = (
    starter: string | undefined,
    decision: string | undefined,
    decisionPitcher: string | undefined,
    outcome: string | undefined
  ) => {
    if (outcome) {
      return `${decision}: ${decisionPitcher ?? "미정"}`;
    } else {
      return `선발: ${starter ?? "미정"}`;
    }
  };

  return (
    <article className="p-5 max-w-1/3 max-w-[480px] border rounded-lg shadow-lg ">
      <span
        className={`block rounded-full text-white text-center py-1 mb-4 whitespace-nowrap overflow-hidden text-ellipsis ${isToday}`}
      >
        {formatDateString(props.displayDate)}
      </span>
      <div className="flex justify-between items-center">
        {/** team1 */}
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <img
              src={emblemMap[team1.key] || "/icons/emblems/default_emblem.png"}
              alt={`${team1.name} Emblem`}
              className="size-16 object-contain"
            />
          </div>
          <dl className="text-center">
            <dt className="font-bold w-24 whitespace-nowrap overflow-hidden text-ellipsis">
              {team1.name}
            </dt>
            <dd className="text-gray-500 w-24 whitespace-nowrap overflow-hidden text-ellipsis">
              {getPitcherInfo(
                team1.starter,
                team1.decision,
                team1.decisionPitcher,
                props.outcome
              )}
            </dd>
          </dl>
        </div>
        {/** info */}
        <div className="flex flex-col items-center mx-2">
          <span className="text-2xl font-bold my-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {team1.score ?? 0} : {team2.score ?? 0}
          </span>
          <span
            className={`text-${
              props.outcome === "승" ? "red" : "gray"
            }-600 font-bold whitespace-nowrap overflow-hidden text-ellipsis`}
          >
            {props.outcome || "-"}
          </span>
          <button className="mt-2 py-1 px-4 bg-gray-200 rounded-full whitespace-nowrap overflow-hidden text-ellipsis">
            경기 정보
          </button>
        </div>
        {/** team2 */}
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <img
              src={emblemMap[team2.key] || "/icons/emblems/default_emblem.png"}
              alt={`${team2.name} Emblem`}
              className="size-16 object-contain"
            />
          </div>
          <dl className="text-center">
            <dt className="font-bold w-24 whitespace-nowrap overflow-hidden text-ellipsis">
              {team2.name}
            </dt>
            <dd className="text-gray-500 w-24 whitespace-nowrap overflow-hidden text-ellipsis">
              {getPitcherInfo(
                team2.starter,
                team2.decision,
                team2.decisionPitcher,
                props.outcome
              )}
            </dd>
          </dl>
        </div>
      </div>
    </article>
  );
}
