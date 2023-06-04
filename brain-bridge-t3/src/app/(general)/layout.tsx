import "../globals.css";
import AuthProvider from "../components/AuthProvider";
import NavBar from "../components/NavBar";
import SocketProvider from "../components/SocketProvider";
import { IoProvider } from 'socket.io-react-hook';
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
      <body className="flex h-screen w-full flex-col ">
        <AuthProvider>
          <SocketProvider>
            <NavBar />
            <div className="flex h-full flex-col">{children}</div>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
