"use client";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
  const { logout } = useAuth0();
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => logout()}
    >
      Sign Out
    </button>
  );
}
