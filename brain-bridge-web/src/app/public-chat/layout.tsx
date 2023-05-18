import Nav from "../(general)/components/nav";
import "../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Brain Bridge",
  description: "Brain Bridge brings what's in your head to the web.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col w-full h-screen">
        <div className="flex flex-col flex-grow w-full h-full">{children}</div>
      </body>
    </html>
  );
}
