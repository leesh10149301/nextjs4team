import Link from "next/link"

export default function Banner() {
  return (
    <div className="h-[253px] w-full bg-[url('/images/sub-bg.png')] bg-no-repeat bg-cover bg-center bg-[#202020]">
      <div className="h-full mx-[166.5px] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center flex-1">
          <h3 className="text-center mb-3 text-5xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
            코칭스텝
          </h3>
          <span className="text-center text-sm opacity-70">
            최고의 kt wiz 코칭스텝을 소개합니다.
          </span>
        </div>
        <div className="flex flex-2 items-center justify-center">
          <ul className="flex gap-2 text-white">
            <li className="flex items-center justify-center text-center w-40 h-[60px] text-lg opacity-70">
              <Link href="/" className=" leading-[60px] w-full">
                코칭스텝
              </Link>
            </li>
            <li className="flex items-center justify-center text-center w-40 h-[60px] text-lg opacity-70">
              <Link href="/" className=" leading-[60px] w-full">
                투수
              </Link>
            </li>
            <li className="flex items-center justify-center text-center w-40 h-[60px] text-lg opacity-70">
              <Link href="/" className=" leading-[60px] w-full">
                타자
              </Link>
            </li>
            <li className="flex items-center justify-center text-center w-40 h-[60px] text-lg opacity-70">
              <Link href="/" className=" leading-[60px] w-full">
                군입대선수
              </Link>
            </li>
            <li className="flex items-center justify-center text-center w-40 h-[60px] text-lg opacity-70">
              <Link href="/" className=" leading-[60px] w-full">
                신입선수
              </Link>
            </li>
            <li className="flex items-center justify-center text-center w-40 h-[60px] text-lg opacity-70">
              <Link href="/" className=" leading-[60px] w-full">
                응원단
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
