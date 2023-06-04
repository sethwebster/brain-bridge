import { NextResponse } from "next/server";
import { createJwt } from "~/lib/jwt";
import { getServerSession } from "~/server/auth";

export async function GET() {
  const session = await getServerSession();
  const user = session?.user;
  if (user) {
    return NextResponse.json({
      token: createJwt(user)
    });
  }
  return NextResponse.error();

}