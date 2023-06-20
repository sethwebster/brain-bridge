"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createJwt } from "~/lib/jwt";

export function CheckLogin({ provider }: { provider: "auth0" | "anonymous" }) {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    const options = {
      callbackUrl: provider === "anonymous" ? window.location.href : "/profile",
    };
    const doSignIn = async () => {
      if (provider === "anonymous") {
        // router.push("/api/auth/callback/anonymous?id_token=123");
        const token = createJwt({
          name: "anonymous",
          email: "noemail@anonymous.com",
        });
        await fetch("/api/auth/callback/anonymous?id_token=" + token, {
          method: "POST",
        });
      } else {
        await signIn(provider, options);
      }
    };
    // if (!session || session.status === "unauthenticated") {
    doSignIn().catch((err) => {
      console.error(err);
    });
    // }
  }, [provider, router, session]);
  return <></>;
}
