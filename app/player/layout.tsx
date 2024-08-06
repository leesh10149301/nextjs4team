import Banner from "@/components/layout/Banner";

export const metadata = {
  title: "WINNING KT : WE ARE GREAT MAGIC",
  description: "ktwiz",
};

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = [
    {
      category: "KT WIZ",
      url: "/player",
      desc: "kt wiz팀을 소개합니다.",
    },
    {
      category: "코칭스태프",
      url: "/player/coach",
      desc: "최고의 kt wiz 코칭스텝을 소개합니다.",
    },
    {
      category: "선수단",
      url: "/player/pitcher",
      desc: "각기 다른 매력을 지닌 kt wiz 팀을 소개합니다.",
    },
  ];
  return (
    <>
      <Banner items={data} />
      {children}
    </>
  );
}
