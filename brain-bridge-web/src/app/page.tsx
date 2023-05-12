import Image from "next/image";
import { LoginButton, LogoutButton } from "./components/auth-buttons";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

export default async function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <h1 className="text-4xl text-black dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert ">
          Your brain, in the cloud, for anyone.
        </h1>
      </div>
      <Image
        src="/splash2.png"
        width={1920}
        height={1080}
        className="relative lg:-top-40 md:-top-20"
        alt="A man peering into a doorway with a science fiction brain inside, glowing."
      />
    </main>
  );
}
