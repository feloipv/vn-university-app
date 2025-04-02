"use client";

import { verifyOtpSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "../ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { IStoredCountdownData } from "@/interfaces/auth";
import { IApiErrorRes } from "@/interfaces/ApiRes";
import {
  useActivateUserMutation,
  useSendOTPMutation,
} from "@/lib/redux/api/auth";
import { maskEmail } from "@/lib/format";
import { cookiesApi } from "@/lib/setCookies";

const COUNTDOWN_DURATION = 30;

export function ActivateAccountForm() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [countdown, setCountdown] = useState(COUNTDOWN_DURATION);
  const [sendOTP, { isLoading }] = useSendOTPMutation();
  const [activateUser, { isLoading: activateUserIsLoading }] =
    useActivateUserMutation();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const form = useForm<z.infer<typeof verifyOtpSchema>>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(
    (duration: number) => {
      clearTimer();
      setCountdown(duration);

      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearTimer();
            localStorage.removeItem("otpCountdownData");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [clearTimer]
  );

  const initializeCountdown = useCallback(() => {
    const storedCountdownData = localStorage.getItem("otpCountdownData");

    if (!storedCountdownData) {
      const startTime = Date.now();
      localStorage.setItem(
        "otpCountdownData",
        JSON.stringify({ startTime, duration: COUNTDOWN_DURATION })
      );
      startTimer(COUNTDOWN_DURATION);
      return;
    }

    try {
      const { startTime, duration }: IStoredCountdownData =
        JSON.parse(storedCountdownData);
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const remainingSeconds = Math.max(0, duration - elapsedSeconds);

      if (remainingSeconds > 0) {
        startTimer(remainingSeconds);
      } else {
        localStorage.removeItem("otpCountdownData");
      }
    } catch (error) {
      console.error("Failed to parse countdown data", error);
      localStorage.removeItem("otpCountdownData");
      initializeCountdown(); // Retry initialization
    }
  }, [startTimer]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedEmail) {
      router.push("/signup");
      return;
    }

    form.setValue("email", storedEmail);
    setIsChecking(false);
    initializeCountdown();

    return () => {
      clearTimer();
    };
  }, [router, form, initializeCountdown, clearTimer]);

  const onSubmit = async (values: z.infer<typeof verifyOtpSchema>) => {
    try {
      const result = await activateUser(values).unwrap();
      await cookiesApi({ name: "isSignin", value: "1" }, "/api/cookies/set");

      toast.success(result.message, {
        position: "top-center",
        richColors: true,
      });

      localStorage.removeItem("userEmail");
      localStorage.removeItem("otpCountdownData");

      router.push("/");
    } catch (error) {
      if (error && typeof error === "object" && "data" in error) {
        const apiError = error.data as IApiErrorRes;
        toast.error(`Activate failed - ${apiError.message}`, {
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
  };

  const handleResendOtp = async () => {
    if (isLoading || countdown > 0) return;

    try {
      await sendOTP({ email: form.getValues("email") }).unwrap();
      toast.success("OTP has been resent", {
        position: "top-center",
        richColors: true,
      });

      const startTime = Date.now();
      localStorage.setItem(
        "otpCountdownData",
        JSON.stringify({ startTime, duration: COUNTDOWN_DURATION })
      );
      startTimer(COUNTDOWN_DURATION);
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.", {
        position: "top-center",
        richColors: true,
      });
    }
  };

  if (isChecking) {
    return null;
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-4xl font-bold capitalize">
          Activate Account
        </CardTitle>
        <CardDescription>
          Please enter the OTP sent to{" "}
          <span className="font-semibold text-black">
            {maskEmail(form.watch("email"))}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-max space-y-6 m-auto"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        {[...Array(6)].map((_, index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Didn't receive OTP?
              </p>
              <button
                type="button"
                disabled={countdown > 0 || isLoading}
                className={`text-sm font-medium ${
                  countdown > 0 || isLoading
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-primary hover:underline cursor-pointer"
                }`}
                onClick={handleResendOtp}
              >
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
              </button>
            </div>
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={activateUserIsLoading}
            >
              {activateUserIsLoading ? "Processing..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
