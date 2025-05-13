"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signinSchema, signupSchema } from "@/schemas/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSigninMutation } from "@/lib/redux/api/auth";
import { IApiErrorRes } from "@/interfaces/ApiRes";
import Link from "next/link";
import { ForgotPassword } from "./forgotPassword";
import { cookiesApi } from "@/lib/setCookies";
import { LoaderCircle } from "lucide-react";

export function SigninForm() {
  const router = useRouter();
  const [signin, { isLoading }] = useSigninMutation();

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "phanvanloi1522003@gmail.com",
      password: "123456",
    },
  });

  async function onSubmit(values: z.infer<typeof signinSchema>) {
    try {
      const result = await signin(values).unwrap();
      await cookiesApi({ name: "isSignin", value: "1" }, "/api/cookies/set");

      toast.success(result.message, {
        position: "top-center",
        richColors: true,
      });

      form.reset();
      router.push("/");
    } catch (error) {
      if (error && typeof error === "object" && "data" in error) {
        const apiError = error.data as IApiErrorRes;
        if (apiError.message == "Account not activated.") {
          localStorage.setItem("userEmail", values.email);
          router.push("/activate_account");
          return;
        }
        toast.error(apiError.message, {
          position: "top-center",
          richColors: true,
        });
      } else {
        toast.error("An unexpected error occurred!", {
          position: "top-center",
          richColors: true,
        });
      }
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Signin</CardTitle>
          <CardDescription>
            Enter your information below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        type="email"
                        {...field}
                        className="focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="******"
                        type="password"
                        {...field}
                        className="focus-visible:ring-0"
                      />
                    </FormControl>
                    <div className="w-full flex justify-end">
                      <ForgotPassword className="text-xs w-max cursor-pointer text-[#737373] hover:underline hover:text-blue-500" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full cursor-pointer"
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin size-5" />
                ) : (
                  "Signin"
                )}
              </Button>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  href={"/signup"}
                  className="text-blue-500 font-semibold hover:underline underline-offset-4"
                >
                  Signup
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
