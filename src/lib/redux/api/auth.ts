import { IResetPassword, ISendOtp, ISignin, ISignup } from "@/schemas/auth";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryRefreshToken from "../baseQueryRefreshToken";

const authApi = createApi({
  reducerPath: "user",
  tagTypes: ["User"],
  baseQuery: baseQueryRefreshToken,
  endpoints: (builder) => ({
    signup: builder.mutation<{ message: string }, ISignup>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    signin: builder.mutation<{ message: string }, ISignin>({
      query: (data) => ({
        url: "/auth/signin",
        method: "POST",
        body: data,
      }),
    }),

    signout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
      }),
    }),

    sendOTP: builder.mutation<{ message: string }, ISendOtp>({
      query: (data) => ({
        url: "/auth/send_OTP",
        method: "POST",
        body: data,
      }),
    }),

    activateUser: builder.mutation<{ message: string }, ISendOtp>({
      query: (data) => ({
        url: "/auth/activate_user",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<{ message: string }, IResetPassword>({
      query: (data) => ({
        url: "/auth/reset_password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export default authApi;
export const {
  useSignupMutation,
  useSendOTPMutation,
  useActivateUserMutation,
  useSigninMutation,
  useResetPasswordMutation,
  useSignoutMutation,
} = authApi;
