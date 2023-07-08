import "../globals.css";
import AuthProvider from "../components/AuthProvider";
import NavBar from "../components/NavBar";
import SocketProvider from "../components/SocketProvider";
import { type Metadata } from "next";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Brain Bridge",
  description: "Brain Bridge brings what's in your head to the web.",
};

export function generateMetadata(): Metadata {
  return {
    ...metadata,
    title: process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
      ? ""
      : `[${process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV ?? ""}] ${metadata.title}`,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen w-full flex-col">
        <AuthProvider>
          <SocketProvider>
            <div className="h-full w-full overflow-hidden">
              <NavBar />
              <div className="mt-16 flex h-full flex-col overflow-auto bg-slate-100 dark:bg-slate-700">
                <div className="mt-4">{children}</div>
              </div>
            </div>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
