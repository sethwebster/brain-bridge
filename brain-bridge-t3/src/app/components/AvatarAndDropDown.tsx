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
      className="h-10 w-10 cursor-pointer rounded-full"
      src={session?.user.image}
      alt="User dropdown" />
  ) : (
    <div
      id="avatarButton"
      data-dropdown-toggle="userDropdown"
      data-dropdown-placement="bottom-start"
      className="h-10 w-10 cursor-pointer rounded-full bg-gray-300"
    >
      <div className="flex h-40 w-40 flex-col justify-center rounded-full bg-gray-400 text-center text-2xl text-white shadow-md">
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
            className="fixed right-10 z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow group-hover:block dark:divide-gray-600 dark:bg-gray-700"
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>{session.user.name}</div>
              <div className="truncate font-medium">{session.user.email}</div>
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
              <div className="block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
