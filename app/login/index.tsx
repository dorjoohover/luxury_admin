"use client";
import { FormEvent, useState } from "react";
import { Button } from "@/components/button";
import { Phone, User } from "lucide-react";
import { Input } from "@/components/input";
import { login } from "../(api)/auth";
import { LoginDto } from "@/models";
import { useRouter } from "next/navigation";
import { Form } from "@/components/form";
import { FORM_GROUP } from "@/lib/constants";
import { colSpan, grid } from "@/lib/const";
import { FORM_TYPE } from "@/lib/enum";
import { toast } from "sonner";

export const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: undefined,
    password: undefined,
  });
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      username: formData.username,
      password: formData.password,
    } as unknown as LoginDto;

    const { data, error } = await login(payload);
    if (error) {
      toast.warning(error ?? "Something wrong");
      return;
    }
    try {
      const result = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          token: data.accessToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Success");
      setTimeout(() => {
        router.push("/");
        router.refresh();
        window.location.replace(window.location.href);
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };

  const updateField = (field: any, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mx-auto max-w-[700px] px-4 w-full relative z-20">
      <form
        onSubmit={(e) => submit(e)}
        className=" bg-gradient-to-b from-muted to-primary-foreground mt-7.5 py-6 px-4"
      >
        <h1 className="text-center text-white mb-7.5 text-[40px]">
          Welcome Back
        </h1>
        <div className="mx-auto bg-primary h-1 w-24"></div>

        <div className="max-w-[436px] mx-auto my-6 ">
          <div className="w-full">
            <Input
              label={"Username"}
              onChange={(e: string) => {
                updateField("username", e);
              }}
              placeholder="Enter your username"
              value={formData.username}
              className="mb-4"
            />
            <Input
              label={"Password"}
              onChange={(e: string) => {
                updateField("password", e);
              }}
              type="password"
              placeholder="Enter your password"
              value={formData.password}
            />
          </div>

          <Button
            type="submit"
            className="w-full font-bold text-background my-6"
          >
            Enter
          </Button>
        </div>
      </form>
    </div>
  );
};
