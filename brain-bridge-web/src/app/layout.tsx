import { type PropsWithChildren } from "react";
import AuthProvider from "./components/AuthProvider";

export default function GlobalLayout({ children }: PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}
