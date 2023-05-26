import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-24">
      <Image
        src="/splash3.png"
        fill
        className="object-fit"
        alt="A man peering into a doorway with a science fiction brain inside, glowing."
      />
      <div className="relative z-50 flex place-items-center before:absolute ">
        <h1 className="text-4xl shadow-sm text-slate-100 drop-shadow-sm dark:text-slate-200 ">
          Your brain, in the cloud, for anyone.
        </h1>
      </div>
    </main>
  );
}
