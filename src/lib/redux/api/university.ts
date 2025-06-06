import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryRefreshToken from "../baseQueryRefreshToken";
import { IApiRes } from "@/interfaces/ApiRes";
import { UniversityType } from "@/schemas/university";
import { IGetUniversityById } from "@/interfaces/university";

const universityApi = createApi({
  reducerPath: "university",
  tagTypes: ["University"],
  baseQuery: baseQueryRefreshToken,
  endpoints: (builder) => ({
    getUniversities: builder.query<
      IApiRes<UniversityType[]>,
      {
        page?: number;
        limit?: number;
        search?: string;
        city?: string;
        type?: string;
      }
    >({
      query: (params) => {
        const queryParams = Object.entries(params)
          .filter(([_key, value]) => value != null && value !== "")
          .reduce((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          }, {} as Record<string, string>);

        const queryString = new URLSearchParams(queryParams).toString();
        return `/universities?${queryString}`;
      },
      providesTags: ["University"],
    }),

    getUniversityById: builder.query<IApiRes<IGetUniversityById>, string>({
      query: (id) => `/university/${id}`,
      providesTags: ["University"],
    }),
  }),
});

export default universityApi;
export const { useGetUniversitiesQuery, useGetUniversityByIdQuery } =
  universityApi;
