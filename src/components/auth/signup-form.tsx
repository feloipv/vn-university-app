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
import { signupSchema } from "@/schemas/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSignupMutation } from "@/lib/redux/api/auth";
import { IApiErrorRes } from "@/interfaces/ApiRes";

export function SigninForm() {
  const router = useRouter();
  const [signup, { isLoading, error }] = useSignupMutation();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: "loipv03",
      email: "phanvanloi1522003@gmail.com",
      password: "123456",
      confirmPassword: "123456",
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    try {
      const result = await signup(values).unwrap();
      toast.success(`Signup successfully - ${result.message}`, {
        position: "top-center",
        richColors: true,
      });

      form.reset();
      localStorage.setItem("userEmail", values.email);
      form.reset();
      router.push("/activate_account");
    } catch (error) {
      if (error && typeof error === "object" && "data" in error) {
        const apiError = error.data as IApiErrorRes;
        toast.error(`Signup failed - ${apiError.message}`, {
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
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>
            Enter your information below to register an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your username"
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="******"
                        type="password"
                        {...field}
                        className="focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full cursor-pointer"
              >
                Signup
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-blue-500 font-semibold hover:underline underline-offset-4"
                >
                  Signin
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
