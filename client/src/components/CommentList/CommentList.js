import React from "react";
import "./CommentList.css";
import { CommentItem } from "../CommentItem/CommentItem";
import NewComment from "../NewComment/NewComment";

export const CommentList = ({
  data,
  handleSendComment,
  loading,
  handleCommentDelete,
  user,
}) => {
  const comments = data.Comment;
  return (
    <div className="comment_list">
      <div className="comment_content">
        {comments.map((item) => (
          <CommentItem
            key={item.id}
            comment={item}
            handleCommentDelete={handleCommentDelete}
            loading={loading}
            user={user}
          />
        ))}
        {comments.length === 0 && "No Comments yet !!!"}
      </div>
      <NewComment handleSendComment={handleSendComment} loading={loading} />
    </div>
  );
};
