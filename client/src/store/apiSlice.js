import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}api/v1/`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().appState?.token;
      if (token) headers.set("token", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Post", "User", "Comment"],
  endpoints: (builder) => ({}),
});
