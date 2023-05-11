import Image from "next/image";
import { getServerSession } from "next-auth";
import { LoginButton, LogoutButton } from "./auth-buttons";

const Logo = () => (
  <Image src="/logo.png" alt="Next.js Logo" width={40} height={37} priority />
);

async function Nav() {
  const session = await getServerSession();
  const loggedIn = session && session.user;
  return (
    <nav className="sticky top-0 flex flex-row p-5 bg-gray-900 border-b border-gray-800">
      <div className="flex font-bold ab">
        <Logo />
        <h1 className="relative ml-3 text-xl top-2">Brain Bridge</h1>
      </div>
      <div className="relative flex-grow">
        <ul className="flex flex-row justify-end">
          <li className="px-5 pt-2.5">Home</li>
          <li className="px-5">
            {!loggedIn && <LoginButton />}
            {loggedIn && <LogoutButton />}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
