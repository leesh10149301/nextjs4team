export function SkeletonTodayScore() {
  return (
    <>
      <div className="flex flex-col items-center flex-1 text-center p-4 bg-gray-800 animate-pulse rounded-lg text-white ">
        <div className="text-lg">순위</div>
        <div className="w-10 animate-pulse rounded-lg h-8 bg-gray-700"></div>
      </div>
      <div className="flex flex-col items-center flex-1 text-center p-4 bg-gray-800 animate-pulse rounded-lg text-white ">
        <div className="text-lg">경기</div>
        <div className="w-10 animate-pulse rounded-lg h-8 bg-gray-700"></div>
      </div>
      <div className="flex flex-col items-center flex-1 text-center p-4 bg-gray-800 animate-pulse rounded-lg text-white ">
        <div className="text-lg">승</div>
        <div className="w-10 animate-pulse rounded-lg h-8 bg-gray-700"></div>
      </div>
      <div className="flex flex-col items-center flex-1 text-center p-4 bg-gray-800 animate-pulse rounded-lg text-white ">
        <div className="text-lg">패</div>
        <div className="w-10 animate-pulse rounded-lg h-8 bg-gray-700"></div>
      </div>
      <div className="flex flex-col items-center flex-1 text-center p-4 bg-gray-800 animate-pulse rounded-lg text-white ">
        <div className="text-lg">무</div>
        <div className="w-10 animate-pulse rounded-lg h-8 bg-gray-700"></div>
      </div>
    </>
  );
}
