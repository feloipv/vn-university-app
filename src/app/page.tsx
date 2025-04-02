"use client";

import { Button } from "@/components/ui/button";
import { useSignoutMutation } from "@/lib/redux/api/auth";
import { cookiesApi } from "@/lib/setCookies";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

export default function Home() {
  const [signout] = useSignoutMutation();
  const router = useRouter();

  const signOut = useCallback(async () => {
    try {
      const result = await signout().unwrap();
      await cookiesApi({ name: "isSignin" }, "/api/cookies/delete");
      toast.success(result.message, {
        position: "top-center",
        richColors: true,
      });
      router.push("/signin");
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  return (
    <Button onClick={signOut} className="">
      Signout
    </Button>
  );
}
