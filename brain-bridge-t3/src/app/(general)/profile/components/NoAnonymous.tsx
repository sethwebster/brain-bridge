import { type Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NoAnonymous({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  console.log("session", session);
  if (session.user.name === "anonymous") {
    return (
      <div className="h-full w-full">
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col text-center">
            <h1>This page is not available to Anonymous users.</h1>
            <p>
              You can create an account or login
              <Link href="/login" className="text-blue-500">here.</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
