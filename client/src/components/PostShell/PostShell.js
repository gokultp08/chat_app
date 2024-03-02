import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import "./PostShell.css";
import { PostViewModal } from "../PostViewModal/PostViewModal";
import { PostList } from "../PostList/PostList";
import FilterPost from "../FilterPost/FilterPost";
import { useGetPostsQuery } from "../../store/postsApi";

export const PostShell = () => {
  const { id = "my_feed" } = useParams();
  const title = id === "my_feed" ? "My Posts" : "All Posts";

  let filteredPosts = [];

  const user = useSelector((state) => state.appState.user);

  const { data, isLoading, error } = useGetPostsQuery(
    id === "my_feed" ? user.id : null
  );

  if (data?.length > 0) {
    filteredPosts = data;
  }

  const [seacrhValue, setSeacrhValue] = useState("");

  const [postModalData, setPostModalData] = useState({
    open: false,
    isNewPost: false,
    data: {},
  });

  const handleClose = () => {
    setPostModalData((prev) => ({
      ...prev,
      open: false,
      isNewPost: false,
      data: {},
    }));
  };

  const handleAddPost = () => {
    setPostModalData((prev) => ({
      ...prev,
      open: true,
      isNewPost: true,
      data: {},
    }));
  };

  const handlePostClick = (data) => {
    setPostModalData((prev) => ({
      ...prev,
      open: true,
      isNewPost: false,
      data,
    }));
  };

  if (isLoading) {
    return <div>Loading!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</div>;
  }

  if (seacrhValue !== "") {
    filteredPosts = filteredPosts.filter((item) =>
      item.content.match(seacrhValue)
    );
  }

  return (
    <div className="postshell">
      <div className="heading">
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
        <div className="action_fields">
          <FilterPost value={seacrhValue} setValue={setSeacrhValue} />
          <Button
            variant="outlined"
            startIcon={<AddCircleIcon />}
            onClick={handleAddPost}
          >
            Add Post
          </Button>
        </div>
      </div>
      <PostList posts={filteredPosts} handlePostClick={handlePostClick} />
      {postModalData.open && (
        <PostViewModal
          open={postModalData.open}
          handleClose={handleClose}
          isNewPost={postModalData.isNewPost}
          data={postModalData.data}
        />
      )}
    </div>
  );
};
