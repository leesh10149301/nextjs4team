import Banner from "@/components/layout/Banner";

export const metadata = {
  title: "WINNING KT : WE ARE GREAT MAGIC",
  description: "ktwiz",
};

export default function FanLayout({ children }: { children: React.ReactNode }) {
  const data = [
    {
      category: "홈런볼예측",
      url: "/fan/homerun",
      desc: "선발 타자에 따른 홈런볼 예측 화면입니다.",
    },
    {
      category: "경기예측",
      url: "/fan/gameprediction",
      desc: "",
    },
    {
      category: "응원게시판",
      url: "/fan/board",
      desc: "KT wiz 팀을 응원해주세요.",
    },
  ];

  return (
    <div>
      <Banner items={data} />
      {children}
    </div>
  );
}
