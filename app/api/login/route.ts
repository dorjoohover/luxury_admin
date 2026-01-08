"use server";;
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const res = NextResponse.json({ success: true });
  res.cookies.set({
    name: "token",
    value: body.token,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
