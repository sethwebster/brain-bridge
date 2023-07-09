"use client";
import { signOut } from "next-auth/react";
import React, { useCallback } from "react";


const LogoutButton = () => {
  const handleSignOut = useCallback(() => {
    signOut({ callbackUrl: "/login" }).catch(console.error);

  }, []);
  return (
    <button
      onClick={handleSignOut}
      className=""
    >
      Sign Out
    </button>
  );
};

export default React.memo(LogoutButton);