import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/env.mjs";
import { getServerSession } from "@/server/auth";
import ServerData from "@/server/server-data";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (session) {
    // CAN TRY AND ACCEPT
    try {
      const acceptance = await ServerData.acceptInvitation(params.id)
      if (acceptance) {
        return NextResponse.redirect(`${env.NEXT_PUBLIC_BASE_URL}/profile/training/${params.id}`);
      } else {
        //TODO: Redirect to a better error page
        return NextResponse.json({ error: "Could not accept invitation" })
      }
    } catch {
      return NextResponse.redirect(`${env.NEXT_PUBLIC_BASE_URL}/not-found`)
    }
  } else {
    const redirect = `${env.NEXTAUTH_URL}/api/auth/signin?callbackUrl=${req.nextUrl.href}`;
    return NextResponse.redirect(redirect);
  }
}