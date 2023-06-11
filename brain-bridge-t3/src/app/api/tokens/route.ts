import { type Session } from "next-auth";
import { NextResponse } from "next/server";
import { createJwt } from "~/lib/jwt";
import { getServerSession } from "~/server/auth";
import delay from "../../../utils/delay"

async function tryGetServerSession() {
  try {
    return await getServerSession();
  } catch (e) {
    console.log("Error getting server session", e)
    return null;
  }
}

export async function GET() {
  console.time("Token");
  let attempts = 0;
  let session: Session | null;
  do {
    session = await tryGetServerSession();
    attempts++;
    await delay(200);
  } while (!session && attempts < 25)

  const user = session?.user;
  if (user) {
    const token = createJwt(user);
    console.timeEnd("Token")
    return NextResponse.json({
      token
    });
  }
  console.error("TODO: Figure out why there is a request coming to this API (/api/tokens) endpoint without a user session");
  return new NextResponse(JSON.stringify({ error: "no user" }), { status: 403 });
  return NextResponse.error();

}