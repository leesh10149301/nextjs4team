import Banner from "@/components/Banner";

export const metadata = {
  title: "auth",
  description: "",
};

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = [
    {
      category: "로그인",
      url: "/auth/login",
      desc: "로그인 후 kt wiz 사이트를 더욱 다양하게 이용해 보세요.",
    },
    {
      category: "회원가입",
      url: "/auth/join",
      desc: "",
    },
  ];
  return (
    <>
      <Banner items={data} />
      {children}
    </>
  );
}