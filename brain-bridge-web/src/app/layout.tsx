import AuthProvider from "./components/auth-provider";
import Nav from "./components/nav";
import "./globals.css";
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
        <AuthProvider>
          {/* @ts-expect-error RSC */}
          <Nav />
          <div className="flex flex-col flex-grow">
            <div className="flex flex-col flex-grow">{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
