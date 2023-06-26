import "../globals.css";
import AuthProvider from "../components/AuthProvider";
import NavBar from "../components/NavBar";
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
      <body className="flex flex-col w-full h-screen">
        <AuthProvider>
          <SocketProvider>
            <div className="w-full h-full overflow-hidden">
              <NavBar />
              <div className="flex flex-col h-full mt-16 overflow-auto bg-slate-100 dark:bg-slate-700">
                <div className="mt-4">{children}</div>
              </div>
            </div>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
