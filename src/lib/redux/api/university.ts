import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryRefreshToken from "../baseQueryRefreshToken";
import { IApiRes } from "@/interfaces/ApiRes";
import { UniversityType } from "@/schemas/university";

const universityApi = createApi({
  reducerPath: "university",
  tagTypes: ["University"],
  baseQuery: baseQueryRefreshToken,
  endpoints: (builder) => ({
    getUniversities: builder.query<
      IApiRes<UniversityType[]>,
      { page?: number; limit?: number }
    >({
      query: ({ page, limit }) => `/universities?page=${page}&limit=${limit}`,
    }),
  }),
});

export default universityApi;
export const { useGetUniversitiesQuery } = universityApi;
