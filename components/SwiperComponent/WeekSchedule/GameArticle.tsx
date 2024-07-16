import Image from "next/image";

interface IGameArticleProps {
  game: "current" | "next" | "prev";
  displayDate: string;
  home: string;
  homeKey: string;
  homeStarter: string;
  homeScore: number;
  outcome: string;
  visit: string;
  visitKey: string;
  visitScore: number;
  visitStarter: string;
}

const emblemMap: { [key: string]: string } = {
  "Dosan": "/icons/emblems/dosan_emblem.png",
  "HH": "/icons/emblems/hanhwa_emblem.png",
  "Kia": "/icons/emblems/kia_emblem.png",
  "WO": "/icons/emblems/kiwoom_emblem.png",
  "KT": "/icons/emblems/kt_emblem.png",
  "LG": "/icons/emblems/lg_emblem.png",
  "LT": "/icons/emblems/lotte_emblem.png",
  "NC": "/icons/emblems/nc_emblem.png",
  "SM": "/icons/emblems/sm_emblem.png",
  "SS": "/icons/emblems/ss_emblem.png",
  "SSG": "/icons/emblems/ssg_emblem.png",
};

export function GameArticle(props: IGameArticleProps) {
  const isToday = props.game === "current" ? "bg-[#ec0a0b]" : "bg-black";
  const formatDateString = (dateString: string) => {
    if (!dateString) return "";
    return `${dateString.substring(0, 4)}.${dateString.substring(
      4,
      6
    )}.${dateString.substring(6, 8)}`;
  };
  return (
    <article className="p-5 w-1/3 border rounded-lg shadow-lg">
      <span
        className={`block rounded-full text-white text-center py-1 mb-4 whitespace-nowrap overflow-hidden text-ellipsis ${isToday}`}
      >
        {formatDateString(props.displayDate)}
      </span>
      <div className="flex justify-between items-center">
        {/** team1 */}
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <Image
              src={emblemMap[props.homeKey] || "/icons/emblems/kt_emblem.png"}
              alt={`${props.home} Emblem`}
              width={64}
              height={64}
              objectFit="contain"
            />
          </div>
          <dl className="text-center">
            <dt className="font-bold w-24 whitespace-nowrap overflow-hidden text-ellipsis">
              {props.home}
            </dt>
            <dd className="text-gray-500 w-24 whitespace-nowrap overflow-hidden text-ellipsis">
              선발: {props.homeStarter ?? "미정"}
            </dd>
          </dl>
        </div>
        {/** info */}
        <div className="flex flex-col items-center mx-4">
          <span className="text-2xl font-bold my-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {props.homeScore ?? 0} : {props.visitScore ?? 0}
          </span>
          <span
            className={`text-${
              props.outcome === "승" ? "red" : "gray"
            }-600 font-bold whitespace-nowrap overflow-hidden text-ellipsis`}
          >
            {props.outcome}
          </span>
          <button className="mt-2 py-1 px-4 bg-gray-200 rounded-full whitespace-nowrap overflow-hidden text-ellipsis">
            경기 정보
          </button>
        </div>
        {/** team2 */}
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <Image
              src={emblemMap[props.visitKey] || "/icons/emblems/kt_emblem.png"}
              alt={`${props.visit} Emblem`}
              width={64}
              height={64}
              objectFit="contain"
            />
          </div>
          <dl className="text-center">
            <dt className="font-bold w-24 whitespace-nowrap overflow-hidden text-ellipsis">
              {props.visit}
            </dt>
            <dd className="text-gray-500 w-24 whitespace-nowrap overflow-hidden text-ellipsis">
              선발: {props.visitStarter ?? "미정"}
            </dd>
          </dl>
        </div>
      </div>
    </article>
  );
}
