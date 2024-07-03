"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

type TBannerItem = {
  desc: string
  category: string
  url: string
}
type TBannerProps = {
  items: TBannerItem[]
}
export default function Banner({ items }: TBannerProps) {

  const pathname = usePathname()
  const categoryPath = pathname.split("/").pop() || items[0].url
  const [activeCategory, setActiveCategory] = useState<string>(
    items.find((item) => item.url.split("/").pop() === categoryPath)
      ?.category || items[0].category
  )
  const [title, setTitle] = useState(
    items.find((item) => item.url.split("/").pop() === categoryPath)
      ?.category || items[0].category
  )
  const [desc, setDesc] = useState(
    items.find((item) => item.url.split("/").pop() === categoryPath)?.desc ||
      items[0].desc
  )

  const onClick = (category: string) => {
    setActiveCategory(category)
  }
  useEffect(() => {
    const activeItem = items.find((item) => item.category === activeCategory)
    if (activeItem) {
      setTitle(activeItem.category)
      setDesc(activeItem.desc)
    }
  }, [activeCategory])
  return (
    <div className="pt-[84px]">
      <div className="h-[253px] w-full bg-[url('/images/sub-bg.png')] bg-no-repeat bg-cover bg-center bg-[#202020]">
        <div className="h-full mx-[166.5px] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center flex-1">
            <h3 className="text-center mb-3 text-5xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              {title}
            </h3>
            <span className="text-center text-sm opacity-70">{desc}</span>
          </div>
          <div className="flex flex-2 items-center justify-center">
            <ul className="flex gap-2 text-white">
              {items?.map((item, id) => (
                <li
                  key={id}
                  className={`flex items-center justify-center text-center w-40 h-[60px] text-lg opacity-70 ${
                    activeCategory === item.category
                      ? "border-b-[3px] border-black text-black"
                      : ""
                  }`}
                  onClick={() => onClick(item.category)}
                >
                  <Link href={item.url} className=" leading-[60px] w-full">
                    {item.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
