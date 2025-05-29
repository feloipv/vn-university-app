import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryRefreshToken from "../baseQueryRefreshToken";
import { IApiRes } from "@/interfaces/ApiRes";
import { IGetMajorById } from "@/interfaces/major";

const majorApi = createApi({
  reducerPath: "major",
  tagTypes: ["Major"],
  baseQuery: baseQueryRefreshToken,
  endpoints: (builder) => ({
    getMajorById: builder.query<IApiRes<IGetMajorById>, string>({
      query: (id) => `/major/${id}`,
      providesTags: ["Major"],
    }),
  }),
});

export default majorApi;
export const { useGetMajorByIdQuery } = majorApi;
