interface IGameArticleProps {
  date: string;
  team1: string;
  team1Pitcher: string;
  score: string;
  result: string;
  team2: string;
  team2Pitcher: string;
  toDaySchedule?: boolean;
}

export function GameArticle(props: IGameArticleProps) {
  const isToday = props.toDaySchedule ? "bg-[#ec0a0b]" : "bg-black";
  return (
    <article className="p-5 w-1/3 border rounded-lg shadow-lg">
      <span
        className={`block rounded-full text-white text-center py-1 mb-4 whitespace-nowrap overflow-hidden text-ellipsis ${isToday}`}
      >
        {props.date}
      </span>
      <div className="flex justify-between items-center">
        {/** team1 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
          <dl className="text-center">
            <dt className="font-bold w-24 whitespace-nowrap overflow-hidden text-ellipsis">
              {props.team1}
            </dt>
            <dd className="text-gray-500 w-24 whitespace-nowrap overflow-hidden text-ellipsis">
              선발: {props.team1Pitcher}
            </dd>
          </dl>
        </div>
        {/** info */}
        <div className="flex flex-col items-center mx-4">
          <span className="text-2xl font-bold my-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {props.score}
          </span>
          <span
            className={`text-${
              props.result === "승" ? "red" : "gray"
            }-600 font-bold whitespace-nowrap overflow-hidden text-ellipsis`}
          >
            {props.result}
          </span>
          <button className="mt-2 py-1 px-4 bg-gray-200 rounded-full whitespace-nowrap overflow-hidden text-ellipsis">
            경기 정보
          </button>
        </div>
        {/** team2 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
          <dl className="text-center">
            <dt className="font-bold w-24 whitespace-nowrap overflow-hidden text-ellipsis">
              {props.team2}
            </dt>
            <dd className="text-gray-500 w-24 whitespace-nowrap overflow-hidden text-ellipsis">
              선발: {props.team2Pitcher}
            </dd>
          </dl>
        </div>
      </div>
    </article>
  );
}
