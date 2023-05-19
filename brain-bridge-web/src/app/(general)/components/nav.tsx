import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LoginButton, LogoutButton } from "./AuthButtons";

const Logo = () => (
  <Image src="/logo.png" alt="Next.js Logo" width={40} height={37} priority />
);

const ProfileButton = async () => {
  const session = await getServerSession();
  const loggedIn = session && session.user;
  return (
    <>
      {loggedIn && (
        <li className="px-5 pt-2.5">
          <Link href="/profile">Profile</Link>
        </li>
      )}
    </>
  );
};

const SignInOutButton = async () => {
  const session = await getServerSession();
  const loggedIn = session && session.user;
  return (
    <>
      <li className="px-5">
        {!loggedIn && <LoginButton />}
        {loggedIn && <LogoutButton />}
      </li>
    </>
  );
};

async function Nav() {
  return (
    <nav className="fixed top-0 z-50 flex flex-row w-full p-5 dark:border-b dark:border-gray-800 dark:bg-gray-900 bg-slate-100 drop-shadow-md">
      <div className="flex font-bold ab">
        <Logo />
        <h1 className="relative ml-3 text-xl top-2">Brain Bridge</h1>
      </div>
      <div className="relative flex-grow">
        <ul className="flex flex-row justify-end">
          <li className="px-5 pt-2.5">
            <Link href="/">Home</Link>
          </li>
          <Suspense fallback={null}>
            {/* @ts-expect-error RSC */}
            <ProfileButton />
          </Suspense>
          <Suspense fallback={null}>
            {/* @ts-expect-error RSC */}
            <SignInOutButton />
          </Suspense>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
