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
    delete: build.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
    }),
    getTopContributers: build.query({
      query: () => ({
        url: "user/topContributers",
        method: "GET",
      }),
      providesTags: (_res, _err, id) => [{ type: "Top User", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useDeleteMutation,
  useGetTopContributersQuery,
} = userApi;
