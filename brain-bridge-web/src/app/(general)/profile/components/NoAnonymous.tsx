import { type Session } from "next-auth";
import Link from "next/link";

export default function NoAnonymous({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  if (session.user.name === "anonymous") {
    return (
      <div className="w-full h-full">
        <div className="flex items-center justify-center w-full h-full">
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
