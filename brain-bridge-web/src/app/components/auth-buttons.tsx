"use client";

import Auth0 from "next-auth/providers/auth0";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <button
      onClick={() => signIn("auth0")}
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
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
    >
      Sign Out
    </button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
