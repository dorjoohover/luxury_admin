import Link from "next/link";
import { LoginPage } from ".";
import { Input } from "@/components/input";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/button";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="z-10 inset-0 absolute bg-background"></div>
      <LoginPage />
    </div>
  );
};
export default Page;
