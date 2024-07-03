export const metadata = {
  title: "fanpage board",
  description: "",
};

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <body>
        <main>{children}</main>
      </body>
    </div>
  );
}
