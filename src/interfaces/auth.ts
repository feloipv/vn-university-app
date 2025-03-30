import { z } from "zod";
import {
  resetPasswordSchema,
  sendOtpSchema,
  signinSchema,
  signupSchema,
  userSchema,
  verifyOtpSchema,
} from "@/schemas/auth";

export type IUser = z.infer<typeof userSchema>;
export type ISignup = z.infer<typeof signupSchema>;
export type IResetPassword = z.infer<typeof resetPasswordSchema>;
export type ISendOtp = z.infer<typeof sendOtpSchema>;
export type IVerifyOtp = z.infer<typeof verifyOtpSchema>;
export type ISignin = z.infer<typeof signinSchema>;
