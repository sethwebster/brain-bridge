"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function CheckLogin({ provider }: { provider: "auth0" | "anonymous" }) {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status==="loading") return;
    if (session.status==="authenticated") return;
    const options = {
      callbackUrl: provider === "anonymous" ? window.location.href : "/profile",
    };
    const doSignIn = async () => {
      if (provider === "anonymous") {
        await signIn(provider, {...options, prompt: "none"});
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
