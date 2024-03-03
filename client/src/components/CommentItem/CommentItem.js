import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";

import "./CommentItem.css";

export const CommentItem = ({
  comment,
  handleCommentDelete,
  loading,
  user,
}) => {
  return (
    <div className="comment_item">
      <div className="item_first">
        <Typography fontSize="14px">{comment?.content}</Typography>
        <Typography fontSize="11px">
          Commented By : {comment?.authorId}
        </Typography>
      </div>
      {user.id === comment.authorId && (
        <DeleteIcon
          className="delete_icon"
          onClick={() => handleCommentDelete(comment.id)}
          disabled={loading}
        />
      )}
    </div>
  );
};
