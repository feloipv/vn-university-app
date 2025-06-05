import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { cookiesApi } from "../setCookies";

interface IRes {
  status: number;
  message: string;
}

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

const baseQueryRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (
      (refreshResult.data as { status: number; message: string })?.status ===
      200
    ) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery(
        {
          url: "/auth/signout",
          method: "POST",
        },
        api,
        extraOptions
      );
      await cookiesApi({ name: "isSignin" }, "/api/cookies/delete");
    }
  }

  return result;
};

export default baseQueryRefreshToken;
