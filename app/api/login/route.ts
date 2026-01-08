"use server";
import { baseUrl } from "@/utils/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const store = await cookies();
   store.set({
      name: "token",
      value: body.token,
      httpOnly: true,
      path: "/",                 // ⭐ заавал
      sameSite: "lax",            // ⭐ dev + prod safe
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,   // 7 хоног (сонголт)
    });

    return NextResponse.redirect(new URL("/", baseUrl));
  } catch (error) {
    console.error("⛔ Route error:", error);
    return NextResponse.json({ success: false });
  }
}
