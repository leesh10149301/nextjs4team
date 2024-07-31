"use client";

import useUserInfo from "@/app/stores/useUserInfo";
import Link from "next/link";
import { MENU_ITEM, MENU_SUB_ITEM } from "@/lib/constants/headerItem";
import Logout from "@/app/auth/logout/page";
import useAuth from "@/app/hooks/useAuth";

export default function Header() {
  const { loading, user } = useAuth();
  const { isLoggedIn, userInfo } = useUserInfo();

  if (loading) return <p>로딩 중...</p>;

  return (
    <nav className="fixed w-full z-[100] bg-black group">
      <div className="h-[84px] flex gap-2 justify-center items-center max-w-[1200px] mx-auto ">
        <div className="flex">
          <div className="w-max-[89px] -mt-2">
            <img
              src="/images/header-logo.svg"
              alt="KT Wiz"
              className=" w-full"
            />
          </div>
          <div className="flex justify-center items-center">
            <ul className="flex m-auto max-w-[950px] w-full">
              {Object.keys(MENU_ITEM).map((key, index) => (
                <li key={index} className="w-28 text-center">
                  <Link
                    href={MENU_ITEM[key]}
                    className="text-[17px] font-medium text-white"
                  >
                    {key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="ml-9">
            <ul className="flex h-full items-center">
              {isLoggedIn && userInfo ? (
                <>
                  <Logout />
                </>
              ) : (
                <>
                  <li className="text-white text-opacity-70 text-sm after:content-['|'] after:pl-2 after:mr-2 after:align-top">
                    <Link href={`/auth/login`} className="align-middle">
                      로그인
                    </Link>
                  </li>
                  <li className="text-white text-opacity-70 text-sm">
                    <Link href={`/auth/join`} className="align-middle">
                      회원가입
                    </Link>
                  </li>
                </>
              )}
              <li className="pl-4">
                <Link
                  href="/"
                  className="align-middle inline-block border border-white rounded-md border-opacity-20 py-3 px-4"
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
        <div className="absolute top-0 w-full bg-white overflow-hidden opacity-0 transform -translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition duration-500 ease-in-out">
          <div className=" max-w-[1200px] mx-auto  w-full">
            <div className="flex gap-2 justify-center items-center  h-[84px] border-b border-[#eceef2]">
              <Link href={"/"}>
                <div className="w-[89px] -mt-2">
                  <img
                    src="/images/logo-black.svg"
                    alt="kt wiz"
                    className="w-full cursor-pointer"
                  />
                </div>
              </Link>
              <div className="flex h-[84px] justify-center items-center">
                <ul className="flex  max-w-[950px] w-full h-full">
                  {Object.keys(MENU_ITEM).map((key, index) => (
                    <li
                      key={index}
                      className=" w-28 text-center h-full flex items-center justify-center hover:border-b-[3px] hover:border-[#ea0101]"
                    >
                      <Link
                        href={MENU_ITEM[key]}
                        className="text-[17px] font-medium"
                      >
                        {key}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ml-9 min-w-[220px]">
                <ul className="flex h-full  items-center ">
                  {isLoggedIn && userInfo ? (
                    <>
                      <Logout />
                    </>
                  ) : (
                    <>
                      <li className=" text-[#35383e]  text-opacity-70 text-sm after:content-['|'] after:pl-2 after:mr-2 after:align-top">
                        <Link href="/auth/logIn" className="align-middle ">
                          로그인
                        </Link>
                      </li>
                      <li className="text-[#35383e] text-opacity-70 text-sm ">
                        <Link href="/auth/join" className="align-middle ">
                          회원가입
                        </Link>
                      </li>
                    </>
                  )}
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
                  {Object.keys(MENU_SUB_ITEM).map((key, index) => (
                    <li key={index} className="w-28 align-top text-sm">
                      <ul>
                        {MENU_SUB_ITEM[key].map((subItem, subIndex) => (
                          <li
                            key={subIndex}
                            className="text-left py-[10px] w-full"
                          >
                            <Link
                              href={subItem.href}
                              className="leading-normal hover:font-bold"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
