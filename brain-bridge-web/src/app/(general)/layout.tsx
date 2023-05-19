import "../globals.css";
import AuthProvider from "./components/AuthProvider";
// import { Inter } from "next/font/google";
import Nav from "./components/Nav";

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
      <body className="flex flex-col w-full h-screen ">
        <AuthProvider>
          {/* @ts-expect-error RSC */}
          <Nav />
          <div className="flex flex-col h-full">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
