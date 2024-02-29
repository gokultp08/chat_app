import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "user/login",
        method: "POST",
        body,
      }),
    }),
    register: build.mutation({
      query: (body) => ({
        url: "user",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = userApi;
