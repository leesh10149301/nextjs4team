import Link from "next/link"

export default function Header() {
  return (
    <nav className="fixed w-full z-[100] bg-black">
      <div className="h-[84px] flex gap-2 justify-center items-center max-w-[1200px] mx-auto ">
        <div className="flex">
          <div className="w-[89px] -mt-2">
            <img
              src="/images/header-logo.svg"
              alt="KT Wiz"
              className=" cursor-pointer w-full"
            />
          </div>
          <div className="flex justify-center items-center">
            <ul className="flex m-auto max-w-[950px] w-full">
              <li className=" w-28  text-center">
                <Link href="/" className="text-[17px] font-medium text-white">
                  kt wiz
                </Link>
              </li>
              <li className=" w-28 text-center">
                <Link href="/" className="text-[17px] font-medium text-white">
                  wiz park
                </Link>
              </li>
              <li className=" w-28 text-center">
                <Link href="/" className="text-[17px] font-medium text-white">
                  Game
                </Link>
              </li>
              <li className=" w-28 text-center">
                <Link href="/" className="text-[17px] font-medium text-white">
                  Player
                </Link>
              </li>
              <li className=" w-28 text-center">
                <Link href="/" className="text-[17px] font-medium text-white">
                  Media
                </Link>
              </li>
              <li className=" w-28 text-center">
                <Link href="/" className="text-[17px] font-medium text-white">
                  팬페이지
                </Link>
              </li>
              <li className=" w-28 text-center">
                <Link href="/" className="text-[17px] font-bold text-[#d60c0c]">
                  티켓구매
                </Link>
              </li>
            </ul>
          </div>
          <div className="ml-9">
            <ul className="flex h-full  items-center">
              <li className=" text-white  text-opacity-70 text-sm after:content-['|'] after:pl-2 after:mr-2 after:align-top">
                <Link href="/" className="align-middle">
                  로그인
                </Link>
              </li>
              <li className="text-white text-opacity-70 text-sm ">
                <Link href="/" className="align-middle">
                  회원가입
                </Link>
              </li>
              <li className="pl-4 w">
                <Link
                  href="/"
                  className="align-middle inline-block border border-white rounded-md border-opacity-20 py-3 px-4 "
                >
                  <img
                    src="/images/kt-sports.png"
                    alt="kt sports"
                    className="w-16"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* 지움ㅁ이나러;ㅁㅇ니ㅏ럼;ㅣㄴ얼;ㅣㅁㅇ나ㅓ리먼이러민얼;ㅣㅁㄴ어;리머;ㅇ니럼;ㅣㄴ얼;ㅣㅁㄴ어ㅣㅏㄹ멍ㄴ  */}
        <div className=" absolute top-0 w-full bg-white overflow-hidden">
          <div className=" max-w-[1200px] mx-auto  w-full">
            <div className="flex gap-2 justify-center items-center  h-[84px] border-b border-[#eceef2]">
              <div className="w-[89px] ">
                <img
                  src="/images/logo-black.svg"
                  alt="kt wiz"
                  className="w-full cursor-pointer"
                />
              </div>
              <div className="flex h-[84px] justify-center items-center">
                <ul className="flex m-auto max-w-[950px] w-full">
                  <li className=" w-28  text-center">
                    <Link href="/" className="text-[17px] font-medium ">
                      kt wiz
                    </Link>
                  </li>
                  <li className=" w-28 text-center">
                    <Link href="/" className="text-[17px] font-medium ">
                      wiz park
                    </Link>
                  </li>
                  <li className=" w-28 text-center">
                    <Link href="/" className="text-[17px] font-medium ">
                      Game
                    </Link>
                  </li>
                  <li className=" w-28 text-center">
                    <Link href="/" className="text-[17px] font-medium ">
                      Player
                    </Link>
                  </li>
                  <li className=" w-28 text-center">
                    <Link href="/" className="text-[17px] font-medium ">
                      Media
                    </Link>
                  </li>
                  <li className=" w-28 text-center">
                    <Link href="/" className="text-[17px] font-medium ">
                      팬페이지
                    </Link>
                  </li>
                  <li className=" w-28 text-center">
                    <Link
                      href="/"
                      className="text-[17px] font-bold text-[#d60c0c]"
                    >
                      티켓구매
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="ml-9">
                <ul className="flex h-full  items-center">
                  <li className=" text-[#35383e]  text-opacity-70 text-sm after:content-['|'] after:pl-2 after:mr-2 after:align-top">
                    <Link href="/" className="align-middle ">
                      로그인
                    </Link>
                  </li>
                  <li className="text-[#35383e] text-opacity-70 text-sm ">
                    <Link href="/" className="align-middle ">
                      회원가입
                    </Link>
                  </li>
                  <li className="pl-4 w">
                    <Link
                      href="/"
                      className="align-middle inline-block border border-white rounded-md border-opacity-20 py-3 px-4 bg-[rgba(0, 0, 0, .1)] "
                    >
                      <img
                        src="/images/kt-sports-black.png"
                        alt="kt sports"
                        className="w-16"
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center">
              <div className=" w-full pt-[10px]">
                <ul className="flex w-full max-w-[950px] ml-[152px] mr-auto text-center">
                  <li className="w-28 align-top text-sm ">
                    <ul>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          kt wiz는?
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          구단 BI
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          회원 정책
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          스폰서
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          웰페이퍼
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="w-28 align-top text-sm mr-1">
                    <ul>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          수원 wiz park
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          주차 예약
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          찾아오기
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          익산야구장
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="w-28 align-top text-sm">
                    <ul>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          정규리그
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          퓨처스리그
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="w-28 align-top text-sm">
                    <ul>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          코칭스텝
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          투수
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          타자
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          응원단
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          신입선수
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          군입대 선수
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          육성 선수
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="w-28 align-top text-sm">
                    <ul>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          wiz 뉴스
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          wiz 스토리
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          시구자 정보
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          wiz 포토
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          하이라이트
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          Live 영상모음
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="w-28 align-top text-sm">
                    <ul>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          홈런볼 예측
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          경기 예측
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          응원 게시판
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="w-28 align-top text-sm">
                    <ul>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          티켓 예매
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          단체 관람
                        </Link>
                      </li>
                      <li className="text-left py-[10px]  w-full">
                        <Link href="" className="leading-normal">
                          입장 및 좌석 정보
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
