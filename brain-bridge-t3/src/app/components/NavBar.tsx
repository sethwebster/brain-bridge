import Link from "next/link";
import { Suspense } from "react";
import { SignInOutButton } from "./SignInOutButton";
import { Logo } from "./Logo";

function NavBar() {
  return (
    <nav className="fixed top-0 z-50 flex w-full flex-row bg-slate-100 p-5 drop-shadow-md dark:border-b dark:border-gray-800 dark:bg-gray-900">
      <div className="ab flex font-bold">
        <Link href="/" className="flex flex-row">
          <Logo />
          <h1 className="relative top-2 ml-3 text-xl">Brain Bridge</h1>
        </Link>
      </div>
      <div className="relative flex-grow">
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
