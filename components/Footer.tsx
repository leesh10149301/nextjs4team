import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative bottom-0 w-full py-[30px] border-t border-[rgba(0,0,0,0.1)]">
      <div className="block">
        <div className="flex mx-auto px-[50px] max-w-[1200px]">
          <div className="flex items-center pr-16 text-center">
            <div className="relative w-[125px] ">
              <img
                src="/images/logo.svg"
                alt="케이티 위즈"
                className="w-full"
              />
            </div>
          </div>
          <div className="w-[600px]">
            <div className="">
              <div className="mb-2">
                <ul className="flex gap-6">
                  <li className="">
                    <Link
                      href="#"
                      className="text-[15px] text-black font-medium"
                    >
                      개인정보 처리방침
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      href="#"
                      className="text-[15px] text-black font-medium"
                    >
                      이용약관
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      href="#"
                      className="text-[15px] text-black font-medium"
                    >
                      이메일무단수집거부
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      href="#"
                      className="text-[15px] text-black font-medium"
                    >
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="">
              <div className="">
                <dl className="flex  text-[13px] leading-normal mb-2">
                  <dt className="w-[70px] text-[#0098af]">대표번호</dt>
                  <dd className="font-bold">1899-5916</dd>
                </dl>
                <dl className="flex  text-[13px] leading-normal mb-2">
                  <dt className="w-[70px] text-[#0098af]">운영시간</dt>
                  <dd className="text-[rgba(0,0,0,.3)]">
                    평일 10:00 ~ 18:00, 주말 10:00 ~ 경기시작 전까지, 월요일 및
                    주말 미경기 시 미운영
                  </dd>
                </dl>
                <dl className="flex  text-[13px] leading-normal mb-2">
                  <dt className="w-[70px] text-[#0098af]">주소</dt>
                  <dd>
                    <address className=" not-italic">
                      경기도 수원시 장안구 경수대로(조원동) 수원 케이티 위즈파크
                    </address>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="">
              <p className="text-xs pt-1 opacity-60">
                Copyright 2022 kt sports. All rights reserved.{" "}
                <span>(feat.KT4U)</span>
              </p>
            </div>
          </div>
          <div className="w-[300px] flex flex-col justify-around">
            <div>
              <label className="block relative w-64 h-11 border border-opacity-30 rounded-lg px-4 py-[13px]">
                <div className="block relative w-full pr-4">
                  <div className="block w-full text-sm px-[5px] overflow-hidden text-ellipsis whitespace-nowrap">
                    kt 그룹사 및 관련사이트
                  </div>
                  <img
                    src="/images/downArrow.png"
                    alt="open"
                    className="absolute -top-[5px] -right-[7px] w-6"
                  ></img>
                </div>
              </label>
            </div>
            <div>
              <ul>
                <li className="relative inline-block pr-1">
                  <Link
                    href="https://www.instagram.com/ktwiz.pr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center relative w-10 h-10 border bg-white border-opacity-10 rounded-lg"
                  >
                    <img
                      src="/images/instagram.png"
                      alt="인스타그램"
                      className="w-5 inline-block relative"
                    />
                  </Link>
                </li>
                <li className="relative inline-block pr-1">
                  <Link
                    href="https://www.facebook.com/ktwiz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center relative w-10 h-10 border bg-white border-opacity-10 rounded-lg"
                  >
                    <img
                      src="/images/facebook.png"
                      alt="페이스북"
                      className="w-5 inline-block relative"
                    />
                  </Link>
                </li>
                <li className="relative inline-block pr-1">
                  <Link
                    href="https://www.youtube.com/c/ktwiztv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center relative w-10 h-10 border bg-white border-opacity-10 rounded-lg"
                  >
                    <img
                      src="/images/youtube.png"
                      alt="유튜브"
                      className="w-5 inline-block relative"
                    />
                  </Link>
                </li>
                <li className="relative inline-block pr-1">
                  <Link
                    href="https://tv.naver.com/ktwiz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center relative w-10 h-10 border bg-white border-opacity-10 rounded-lg"
                  >
                    <img
                      src="/images/naver.png"
                      alt="네이버"
                      className="w-5 inline-block relative"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
