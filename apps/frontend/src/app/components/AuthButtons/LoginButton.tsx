"use client";
import { signIn } from "next-auth/react";
import React, { useCallback } from "react";

const LoginButton = () => {
  const handleSignIn = useCallback(() => {
    signIn("auth0").catch(console.error);
  }, []);
  return (
    <button
      onClick={handleSignIn}
      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
    >
      Sign in
    </button>
  );
};

export default React.memo(LoginButton);