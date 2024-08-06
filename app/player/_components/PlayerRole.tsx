"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
export type TSearchBarProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};
export default function PlayerRole({
  searchTerm,
  setSearchTerm,
}: TSearchBarProps) {
  const pathname = usePathname();
  return (
    <>
      <div className="w-full h-16 flex justify-center items-center my-10 ">
        <div className="w-[1100px] flex justify-between text-xl font-bold items-center ">
          {pathname.split("/").pop() === "coach" ? (
            <div className="mr-10 border-b-2 border-[#d60c0c] p-2">
              코칭스태프
            </div>
          ) : pathname.split("/").pop() === "player" ? (
            <div className="mr-10 border-b-2 border-[#d60c0c] p-2">전체</div>
          ) : (
            <div className="mr-8">
              <ul className=" flex gap-2 justify-center">
                <li>
                  <Link
                    href="/player/pitcher"
                    className={`cursor-pointer  p-2 ${
                      pathname.includes("/player/pitcher")
                        ? "border-b-2 border-[#d60c0c]"
                        : "text-gray-700 hover:text-black"
                    }`}
                  >
                    투수
                  </Link>
                </li>
                <li>
                  <Link
                    href="/player/catcher"
                    className={`cursor-pointer  p-2 ${
                      pathname.includes("/player/catcher")
                        ? "border-b-2 border-[#d60c0c]"
                        : "text-gray-700 hover:text-black"
                    }`}
                  >
                    포수
                  </Link>
                </li>
                <li>
                  <Link
                    href="/player/infielder"
                    className={`cursor-pointer  p-2 ${
                      pathname.includes("/player/infielder")
                        ? "border-b-2 border-[#d60c0c]"
                        : "text-gray-700 hover:text-black"
                    }`}
                  >
                    내야수
                  </Link>
                </li>
                <li>
                  <Link
                    href="/player/outfielder"
                    className={`cursor-pointer p-2 ${
                      pathname.includes("/player/outfielder")
                        ? "border-b-2 border-[#d60c0c]"
                        : "text-gray-700 hover:text-black"
                    }`}
                  >
                    외야수
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {pathname.split("/").pop() === "player" && (
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          )}
        </div>
      </div>
    </>
  );
}
