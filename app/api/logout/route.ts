import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const store = await cookies();
  store.delete("token");
  return NextResponse.redirect(
    new URL("/login", process.env.URL)
  );
}
