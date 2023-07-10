import { getServerSession } from "@/server/auth";
import { AvatarAndDropDown } from "./AvatarAndDropDown";
import React from "react";
import { LoginButton } from "./AuthButtons";

const SignInOutButton = async () => {
  const session = await getServerSession();
  const loggedIn = session && session.user && session.user.email !== "anonymous";
  return (
    <>
      <li className="px-5">
        {!loggedIn && <LoginButton />}
        {loggedIn && <AvatarAndDropDown />}
      </li>
    </>
  );
};

export default React.memo(SignInOutButton);