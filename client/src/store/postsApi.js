import { apiSlice } from "./apiSlice";

export const postsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query({
      query: (id = null) => ({
        url: id != null ? `post/all/user/${id}` : "post/all",
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
      query: ({ id, body }) => ({
        url: `post/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Post", "Tag"],
    }),
    deletePost: build.mutation({
      query: (id) => ({
        url: `post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "post", id: "LIST" }, { type: "Tag" }],
    }),
    createComment: build.mutation({
      query: (body) => ({
        url: "comment",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "POST", id: "LIST" }, { type: "Tag" }],
    }),
    deleteComment: build.mutation({
      query: (id) => ({
        url: `comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "post", id: "LIST" }, { type: "Tag" }],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useEditPostMutation,
  useGetPostQuery,
  useDeletePostMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetPostsQuery,
} = postsApi;
