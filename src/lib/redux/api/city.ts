import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Province {
  results: {
    id: number;
    name: string;
    name_en: string;
    type: string;
  }[];
}

const cityApi = createApi({
  reducerPath: "city",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vnprovinces.pythonanywhere.com",
  }),
  endpoints: (builder) => ({
    getAllCity: builder.query<Province, void>({
      query: () => "/api/provinces/?basic=true&limit=100",
    }),
  }),
});

export default cityApi;
export const { useGetAllCityQuery } = cityApi;
