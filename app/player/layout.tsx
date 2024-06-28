export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
}

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = [
    {
      category: "코칭스텝",
      url: "/player/coach",
      desc: "최고의 kt wiz 코칭스텝을 소개합니다.",
    },
    {
      category: "투수",
      url: "/player/pitcher",
      desc: "kt wiz의 자랑스런 '첫 번째 선수단'을 소개합니다.",
    },
    {
      category: "타자",
      url: "/player/catcher",
      desc: "kt wiz의 자랑스런 '첫 번째 선수단'을 소개합니다.",
    },
  ]
  return (
    <>
      {/* <Banner items={data} /> */}
      {children}
    </>
  )
}
