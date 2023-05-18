import generateId from "@/utils/generate-id";
import { NextRequest, NextResponse } from "next/server";

export function POST(req: NextRequest) {
  if (req.cookies.get("viewer-id")) {
    return NextResponse.json({ id: req.cookies.get("viewer-id") })
  }
  const id = generateId();
  return new Response(JSON.stringify({ id }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `viewer-id=${id}; Path=/; SameSite=Strict; Max-Age=31536000;`,
    }
  });
}