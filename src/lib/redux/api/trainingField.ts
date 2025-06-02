import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryRefreshToken from "../baseQueryRefreshToken";
import { IApiRes } from "@/interfaces/ApiRes";
import { ITrainingField } from "@/schemas/trainingField";
import { IGetTrainingFieldById } from "@/interfaces/trainingField";

const trainingFieldApi = createApi({
  reducerPath: "trainingField",
  tagTypes: ["TrainingField"],
  baseQuery: baseQueryRefreshToken,
  endpoints: (builder) => ({
    getTrainingFields: builder.query<
      IApiRes<ITrainingField[]>,
      {
        page?: number;
        limit?: number;
        search?: string;
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
        return `/training-fields?${queryString}`;
      },
      providesTags: ["TrainingField"],
    }),
    getTrainingFieldById: builder.query<IApiRes<IGetTrainingFieldById>, string>(
      {
        query: (id) => `/training-field/${id}`,
        providesTags: ["TrainingField"],
      }
    ),
  }),
});

export default trainingFieldApi;
export const { useGetTrainingFieldsQuery, useGetTrainingFieldByIdQuery } =
  trainingFieldApi;
