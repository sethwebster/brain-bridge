import { NextResponse, type NextRequest } from "next/server";
import { env } from "~/env.mjs";
import { getServerSession } from "~/server/auth";
import ServerData from "~/server/server-data";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (session) {
    // CAN ACCEPT
    const acceptance = await ServerData.acceptInvitation(params.id)
    if (acceptance) {
      return NextResponse.redirect(`${env.NEXT_PUBLIC_BASE_URL}/profile/training/${params.id}`);
    } else {
      return NextResponse.json({ error: "Could not accept invitation" })
    }
  } else {
    // http://localhost:3000

    const redirect = `${env.NEXTAUTH_URL}/api/auth/signin?callbackUrl=${req.nextUrl.href}`;
    return NextResponse.redirect(redirect);
  }
}