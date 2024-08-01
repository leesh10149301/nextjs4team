interface ISkeletonPlayerItemProps {}
export default function SkeletonPlayerItem(props: ISkeletonPlayerItemProps) {
  return (
    <>
      <div className="ml-2 w-[23%] h-[345px] border shadow-lg rounded-lg my-5 mx-1 animate-pulse">
        <div className="pt-5 w-full rounded-t-lg h-[271px] bg-gray-300"></div>
        <div className="flex justify-between items-center p-2 h-[72px]">
          <div className="flex flex-col gap-2">
            <div className="h-6 w-12 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="h-4 w-8 bg-gray-300 animate-pulse rounded-lg"></div>
          </div>
          <div className="text-red-600 font-bold text-4xl">00</div>
        </div>
      </div>
    </>
  );
}
