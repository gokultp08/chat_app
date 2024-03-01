import { apiSlice } from "./apiSlice";

export const postsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllPosts: build.query({
      query: () => ({
        url: "post/all",
        method: "GET",
      }),
    }),
    getPost: build.query({
      query: (id) => `post/${id}`,
      providesTags: (_res, _err, id) => [{ type: "Post", id }],
    }),
    createPost: build.mutation({
      query: (body) => ({
        url: "post",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "POST", id: "LIST" }, { type: "Tag" }],
    }),
    editPost: build.mutation({
      query: (body) => ({
        url: `post/${body.get("id")}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Post", "Tag"],
    }),
    deletePost: build.mutation({
      query: (slug) => ({
        url: `post/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "post", id: "LIST" }, { type: "Tag" }],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useEditPostMutation,
  useGetAllPostsQuery,
  useGetPostQuery,
  useDeletePostMutation,
} = postsApi;
