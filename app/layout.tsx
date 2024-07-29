import "./global.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Chatbot from "../components/WizChat";

export const metadata = {
  title: "WINNING KT : WE ARE GREAT MAGIC",
  description: "kt wiz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="min-h-[900px]">{children}</div>
        <Footer />
        <Chatbot />
        <div id="chatBot"></div>
      </body>
    </html>
  );
}
