import Link from "next/link";
import { Suspense } from "react";
import { SignInOutButton } from "./SignInOutButton";
import { Logo } from "./Logo";

function NavBar() {
  return (
    <nav className="absolute top-0 z-50 flex flex-row w-full p-5 shadow-lg bg-slate-100 dark:border-b dark:border-gray-800 dark:bg-gray-900">
      <div className="absolute flex font-bold">
        <Link href="/" className="flex flex-row"> 
          <Logo />
          <h1 className="relative ml-3 text-xl top-2">Brain Bridge</h1>
        </Link>
      </div>
      <div className="flex-grow ">
        <ul className="flex flex-row justify-end">
          <Suspense fallback={null}>
            {/* @ts-expect-error RSC */}
            <SignInOutButton />
          </Suspense>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
