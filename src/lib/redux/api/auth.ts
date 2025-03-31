import { ISendOtp, ISignup, IVerifyOtp } from "@/schemas/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/`;

const authApi = createApi({
  reducerPath: "user",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<{ message: string }, ISignup>({
      query: (data) => ({
        url: "signup",
        method: "POST",
        body: data,
      }),
    }),

    sendOTP: builder.mutation<{ message: string }, ISendOtp>({
      query: (data) => ({
        url: "send_OTP",
        method: "POST",
        body: data,
      }),
    }),

    activateUser: builder.mutation<{ message: string }, IVerifyOtp>({
      query: (data) => ({
        url: "activate_user",
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
} = authApi;
