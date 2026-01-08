"use server";

import { cookies } from "next/headers";

export async function deleteCookie() {
  const cookieStore = await cookies();
  console.log("logout");
  cookieStore.delete("token");
}
