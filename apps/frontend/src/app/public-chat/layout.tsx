import "../globals.css";
import SocketProvider from "../components/SocketProvider";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

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
      <body className="flex h-screen w-full flex-col">
        <SocketProvider>
          <div className="flex h-full w-full flex-grow flex-col">
            {children}
          </div>
        </SocketProvider>
      </body>
    </html>
  );
}
