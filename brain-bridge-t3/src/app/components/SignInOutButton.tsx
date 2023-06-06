import { LoginButton } from "./AuthButtons";
import { getServerSession } from "~/server/auth";
import { AvatarAndDropDown } from "./AvatarAndDropDown";

export const SignInOutButton = async () => {
  const session = await getServerSession();
  const loggedIn = session && session.user;
  return (
    <>
      <li className="px-5">
        {!loggedIn && <LoginButton />}
        {/* @ts-expect-error RSC */}
        {loggedIn && <AvatarAndDropDown />}
      </li>
    </>
  );
};
