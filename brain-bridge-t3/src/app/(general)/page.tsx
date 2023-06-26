import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-24">
      <Image
        src="/splash3.png"
        fill
        className="object-cover"
        alt="A man peering into a doorway with a science fiction brain inside, glowing."
      />
      <div className="flex h-full place-items-center ">
        <h1 className="text-4xl shadow-sm text-slate-100 drop-shadow-sm dark:text-slate-200 ">
          Your brain, in the cloud, for anyone.
        </h1>
      </div>
    </main>
  );
}
