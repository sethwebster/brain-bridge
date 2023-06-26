import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "./AuthButtons";
import { getServerSession } from "~/server/auth";

export const AvatarAndDropDown = async () => {
  const session = await getServerSession();
  const avatarComponent = session?.user.image ? (
    <Image
      id="avatarButton"
      width={40}
      height={40}
      data-dropdown-toggle="userDropdown"
      data-dropdown-placement="bottom-start"
      className="w-10 h-10 rounded-full cursor-pointer"
      src={session?.user.image}
      alt="User dropdown" />
  ) : (
    <div
      id="avatarButton"
      data-dropdown-toggle="userDropdown"
      data-dropdown-placement="bottom-start"
      className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer"
    >
      <div className="flex flex-col justify-center w-40 h-40 text-2xl text-center text-white bg-gray-400 rounded-full shadow-md">
        <div>{(session?.user.name || "User")[0]?.toUpperCase()}</div>
      </div>
    </div>
  );
  const loggedIn = session && session.user;

  return (
    <>
      {loggedIn && (
        <div className="group">
          {avatarComponent}
          <div
            id="userDropdown"
            className="fixed z-50 hidden bg-white divide-y divide-gray-100 rounded-lg shadow right-10 w-44 group-hover:block dark:divide-gray-600 dark:bg-gray-700"
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>{session.user.name}</div>
              <div className="font-medium truncate">{session.user.email}</div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="avatarButton"
            >
              <li>
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/chats"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Chats
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/training"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Training Sets
                </Link>
              </li>
            </ul>
            <div className="py-1">
              <div className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
