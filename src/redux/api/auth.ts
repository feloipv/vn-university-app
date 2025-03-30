import { ISendOtp, ISignup } from "@/interfaces/auth";
import { IApiErrorRes } from "@/interfaces/ApiRes";
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
    signup: builder.mutation<IApiErrorRes | { message: string }, ISignup>({
      query: (data) => ({
        url: "signup",
        method: "POST",
        body: data,
      }),
    }),

    sendOTP: builder.mutation<IApiErrorRes | { message: string }, ISendOtp>({
      query: (data) => ({
        url: "send_OTP",
        method: "POST",
        body: data.email,
      }),
    }),
  }),
});

export default authApi;
export const { useSignupMutation, useSendOTPMutation } = authApi;
