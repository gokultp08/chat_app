import React from "react";
import "./PostList.css";
import { PostItem } from "./PostItem/PostItem";

export const PostList = ({ posts, handlePostClick }) => {
  return (
    <div className="postlist">
      {posts.map((post) => (
        <PostItem post={post} handlePostClick={handlePostClick} key={post.id} />
      ))}
    </div>
  );
};
