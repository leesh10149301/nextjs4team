import Image from "next/image";

export default function MonthlyPlayer() {
  return (
    <div className="w-[550px] h-[300px] bg-gray-100 flex items-center justify-center mx-2 relative">
      <Image
        src={
          "https://www.ktwiz.co.kr/v2/imgs/dummy/main/img/banner/player@2x.png"
        }
        alt="monthly-player"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
      <div className="absolute left-12 top-[72px] ">
        <div className="flex items-end gap-2 mb-[34px]">
          <Image
            src="/icons/ktwiz_logo.svg"
            alt="logo"
            width={81}
            height={38}
          />
          <span className="text-white font-light text-[15px]">이달의 선수</span>
        </div>
        <div className="flex flex-col items-start leading-none text-[53px] font-normal">
          <span className="text-[#f53232] p-0">14</span>
          <span className="text-white p-0">천성호</span>
        </div>
      </div>
    </div>
  );
}
