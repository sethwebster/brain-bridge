"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useCallback } from "react";

export const LoginButton = () => {
  const handleSignIn = useCallback(() => {
    signIn("auth0").catch(console.error)
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

export const RegisterButton = () => {
  return (
    <Link href="/register" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  const handleSignOut = useCallback(() => {
    signOut().catch(console.error)
  }, []);
  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
    >
      Sign Out
    </button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
