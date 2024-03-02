import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import "./PostViewModal.css";
import { PostForm } from "../PostForm/PostForm";
import {
  useCreateCommentMutation,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useDeleteCommentMutation,
} from "../../store/postsApi";
import { ToastContext } from "../../context/ToastProvider";
import ViewPost from "../ViewPost/ViewPost";

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

  const [
    editPost,
    {
      isSuccess: isEditPostSuccess,
      isLoading: isEditPostLoading,
      error: editPostError,
    },
  ] = useEditPostMutation();

  const [
    deletePost,
    {
      isSuccess: isDeletePostSuccess,
      isLoading: isDeletePostLoading,
      error: deletePostError,
    },
  ] = useDeletePostMutation();

  const [
    submitCreateComment,
    {
      isSuccess: isCreateCommentSuccess,
      isLoading: isCreateCommentLoading,
      error: createCommentError,
    },
  ] = useCreateCommentMutation();

  const [
    deleteComment,
    {
      isSuccess: isDeleteCommentSuccess,
      isLoading: isDeleteCommentLoading,
      error: deleteCommentError,
    },
  ] = useDeleteCommentMutation();

  useEffect(() => {
    if (isCreatePostSuccess) {
      showToast("success", "Post Created");
      handleClose();
    } else if (createPostError) {
      const err = createPostError.data;
      showToast("error", err.message);
    }
  }, [isCreatePostSuccess, createPostError]);

  useEffect(() => {
    if (isCreateCommentSuccess) {
      showToast("success", "Comment Added");
      handleClose();
    } else if (createCommentError) {
      const err = createCommentError.data;
      showToast("error", err.message);
    }
  }, [isCreateCommentSuccess, createCommentError]);

  useEffect(() => {
    if (isEditPostSuccess) {
      showToast("success", "Post Updated");
      handleClose();
    } else if (editPostError) {
      const err = editPostError.data;
      showToast("error", err.message);
    }
  }, [isEditPostSuccess, editPostError]);

  useEffect(() => {
    if (isDeletePostSuccess) {
      showToast("success", "Post Deleted");
      handleClose();
    } else if (deletePostError) {
      const err = deletePostError.data;
      showToast("error", err.message);
    }
  }, [isDeletePostSuccess, deletePostError]);

  useEffect(() => {
    if (isDeleteCommentSuccess) {
      showToast("success", "Comment Deleted");
      handleClose();
    } else if (deleteCommentError) {
      const err = deleteCommentError.data;
      showToast("error", err.message);
    }
  }, [isDeleteCommentSuccess, deleteCommentError]);

  const createPost = () => {
    submitCreatePost({ authorId: user.id, content: value });
  };

  const handleSendComment = (comment) => {
    const obj = {
      authorId: data.authorId,
      postId: data.id,
      content: comment,
    };
    submitCreateComment(obj);
  };

  const handleEditPost = () => {
    editPost({ id: data.id, body: { content: value } });
  };

  const handleCommentDelete = (id) => {
    deleteComment(id);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={{ padding: "2rem" }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {isNewPost ? "New Post" : mode === "edit" ? "Edit Post" : " View Post"}
        {!isNewPost && (
          <div className="edit_close_buttons">
            <Tooltip title="Delete Post">
              <DeleteIcon
                onClick={() => deletePost(data.id)}
                disabled={isDeletePostLoading || isDeleteCommentLoading}
              />
            </Tooltip>
            <Tooltip title="Edit Post">
              <EditIcon
                onClick={() => setMode("edit")}
                disabled={isDeletePostLoading || isDeleteCommentLoading}
              />
            </Tooltip>
            <Tooltip title="Close">
              <CloseIcon
                onClick={() => handleClose()}
                disabled={isDeletePostLoading || isDeleteCommentLoading}
              />
            </Tooltip>
          </div>
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          height: "max-content",
        }}
      >
        {(mode === "edit" || isNewPost) && (
          <div className="editor">
            <PostForm value={value} setValue={setValue} />
          </div>
        )}
        {mode === "view" && !isNewPost && (
          <ViewPost
            user={user}
            data={data}
            handleSendComment={handleSendComment}
            loading={isCreateCommentLoading}
            handleCommentDelete={handleCommentDelete}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={
            isCreatePostLoading ||
            isCreateCommentLoading ||
            isDeletePostLoading ||
            isEditPostLoading ||
            isDeleteCommentLoading
          }
        >
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
          <Button
            type="submit"
            variant="contained"
            onClick={() => handleEditPost()}
          >
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
