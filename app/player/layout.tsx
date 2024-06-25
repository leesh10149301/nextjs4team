import Banner from "../../components/Banner"

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Banner />
        {children}
      </body>
    </html>
  )
}
