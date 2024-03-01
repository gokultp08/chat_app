import React, { useContext, useEffect, useState } from "react";
import "./PostViewModal.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { PostForm } from "../PostForm/PostForm";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { useCreatePostMutation } from "../../store/postsApi";
import { ToastContext } from "../../context/ToastProvider";

export const PostViewModal = ({ open, handleClose, isNewPost, data }) => {
  const [value, setValue] = useState(data?.content || "");
  const [mode, setMode] = useState("view"); //view or edit
  const { showToast } = useContext(ToastContext);

  const user = useSelector((state) => state.appState.user);

  const [
    submitCreatePost,
    {
      isSuccess: isCreatePostSuccess,
      isLoading: isCreatePostLoading,
      error: createPostError,
    },
  ] = useCreatePostMutation();

  useEffect(() => {
    if (isCreatePostSuccess) {
      showToast("success", "Post Created");
      handleClose();
    } else if (createPostError) {
      const err = createPostError.data;
      showToast("error", err.message);
    }
  }, [isCreatePostSuccess, createPostError]);

  const sanitizedContent = DOMPurify.sanitize(data?.content);

  const createPost = () => {
    submitCreatePost({ authorId: user.id, content: value });
  };

  const editPost = () => {};
  console.log("modal", isNewPost, mode);
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {"New Post"}
        {!isNewPost && <EditIcon onClick={() => setMode("edit")} />}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        {(mode === "edit" || isNewPost) && (
          <PostForm value={value} setValue={setValue} />
        )}
        {mode === "view" && !isNewPost && (
          // <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          <div>{"fddgfdsfgdfsg"}</div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isCreatePostLoading}>
          Close
        </Button>
        {isNewPost && (
          <Button
            type="submit"
            variant="contained"
            onClick={() => createPost()}
            disabled={isCreatePostLoading}
          >
            Create Post
          </Button>
        )}
        {mode === "edit" && (
          <Button type="submit" variant="contained" onClick={() => editPost()}>
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
