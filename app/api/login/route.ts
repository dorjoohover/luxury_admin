"use server";
import { baseUrl } from "@/utils/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = NextResponse.redirect(new URL("/", request.url));
    console.log(baseUrl)
    response.cookies.set({
      name: "token",
      value: body.token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
    });
    console.log("login");
    return response;
  } catch (error) {
    console.error("⛔ Route error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
