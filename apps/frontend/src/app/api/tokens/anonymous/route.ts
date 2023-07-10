import { NextResponse } from "next/server";
import { createJwt } from "@/lib/jwt";

export const dynamic = 'force-dynamic'

export function POST() {
  const token = createJwt({
    name: "anonymous",
    email: "noemail@anonymous.com",
  });

  return NextResponse.json({ token });
}