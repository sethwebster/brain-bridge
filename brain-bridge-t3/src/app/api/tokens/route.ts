import { type Session } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import { createJwt } from "~/lib/jwt";
import Logger from "~/lib/logger";
import { getServerSession } from "~/server/auth";

async function tryGetServerSession() {
  try {
    return await getServerSession();
  } catch (e) {
    Logger.error("Error getting server session", e)
    return null;
  }
}

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  Logger.info("GET /api/tokens", req.referrer);
  console.time("Token");
  const session: Session | null = await tryGetServerSession();

  if (!session) {
    console.error("TODO: Figure out why there is a request coming to this API (/api/tokens) endpoint without a user session", req.referrer);
    return new NextResponse(JSON.stringify({ error: "no session" }), { status: 403 });
  }

  const user = session.user;
  if (user) {
    const token = createJwt(user);
    console.timeEnd("Token")
    return NextResponse.json({
      token
    });
  } else {
    console.error("TODO: Figure out why there is a request coming to this API (/api/tokens) endpoint without a user ON the session", req.referrer);
    return new NextResponse(JSON.stringify({ error: "no user" }), { status: 403 });
  }
}