import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

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
      "/auth/refresh_token",
      api,
      extraOptions
    );

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery("/auth/signout", api, extraOptions);
    }
  }

  return result;
};

export default baseQueryRefreshToken;
