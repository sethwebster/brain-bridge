import Link from "next/link";
import React, { Suspense } from "react";
import { Logo } from "./Logo";
import EnvironmentMarker from "./EnvironmentMarker";
import SignInOutButton from "./SignInOutButton";

function NavBar() {
  return (
    <nav className="absolute top-0 z-50 flex flex-row w-full p-5 shadow-lg bg-slate-100 dark:border-b dark:border-gray-800 dark:bg-gray-900">
        <EnvironmentMarker />
      <div className="absolute flex font-bold">
        <Link href="/" className="flex flex-row"> 
          <Logo />
          <h1 className="relative ml-3 text-xl top-2">Brain Bridge</h1>
        </Link>
      </div>
      <div className="flex-grow ">
        <ul className="flex flex-row justify-end">
          <Suspense fallback={null}>
            <SignInOutButton />
          </Suspense>
        </ul>
      </div>
    </nav>
  );
}

export default React.memo(NavBar);
