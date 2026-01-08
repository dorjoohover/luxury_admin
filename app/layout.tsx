import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { API, Api } from "@/utils/api";
import Sidebar from "@/components/sidebar";
import { deleteCookie } from "./actions/logout";
import { Toaster } from "sonner";

const pfd = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Infinite Luxury",
  description: "descipriotn",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = await cookies();
  const token = store.get("token")?.value;

  const me = async () => {
    try {
      const res = await fetch(`${API[Api.user]}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const data = await res.json();
      if (data.succeed) {
        return data;
      } else {
        deleteCookie();
      }
    } catch (error) {
      console.log(error);
      deleteCookie();
    }
  };
  let user = null;
  if (token) user = await me();
  if (!token) user = null;
  return (
    <html lang="en">
      <body
        className={`${pfd.variable} ${inter.variable} antialiased bg-background `}
      >
        <Toaster position="top-center" richColors />
        <Sidebar user={user}>{children}</Sidebar>
      </body>
    </html>
  );
}
