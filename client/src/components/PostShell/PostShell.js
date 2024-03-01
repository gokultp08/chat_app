import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import { PostViewModal } from "../PostViewModal/PostViewModal";
import { PostList } from "../PostList/PostList";
import { useGetAllPostsQuery } from "../../store/postsApi";
import "./PostShell.css";

export const PostShell = () => {
  const { id = "all" } = useParams();
  const title = id === "all" ? "All Posts" : "My Posts";

  let posts = [];

  const { data, isLoading, error } = useGetAllPostsQuery();

  if (data?.length > 0) {
    posts = data;
  }

  const [open, setOpen] = useState(false);
  const [isNewPost, setIsNewPost] = useState(false);
  const [postModalData, setPostModalData] = useState({
    open: false,
    value: "",
    isNewPost: false,
  });

  const handleClose = () => {
    setPostModalData((prev) => ({
      ...prev,
      open: false,
      value: "",
      isNewPost: false,
    }));
  };
  const handleAddPost = () => {
    setPostModalData((prev) => ({
      ...prev,
      open: true,
      isNewPost: true,
      value: "",
    }));
  };

  const handlePostClick = (data) => {
    setPostModalData((prev) => ({
      ...prev,
      open: true,
      isNewPost: false,
      value: data,
    }));
  };

  if (isLoading) {
    return <div>Loading!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</div>;
  }
  console.log("render", postModalData);
  return (
    <div className="postshell">
      <div className="heading">
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddCircleIcon />}
          onClick={handleAddPost}
        >
          Add Post
        </Button>
      </div>
      <PostList posts={posts} handlePostClick={handlePostClick} />
      <PostViewModal
        open={postModalData.open}
        handleClose={handleClose}
        isNewPost={postModalData.isNewPost}
        data={postModalData.data}
      />
    </div>
  );
};
