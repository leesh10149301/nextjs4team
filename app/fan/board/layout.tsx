import Banner from "@/components/Banner";

export const metadata = {
  title: "fanpage board",
  description: "",
};

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = [
    {
      category: "팬페이지",
      url: "/fan/board",
      desc: "팬페이지 입니다.",
    },
  ];
  return (
    <>
      <Banner items={data} />
      {children}
    </>
  );
}
