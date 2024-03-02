import * as React from "react";
import DOMPurify from "dompurify";
import { Card, CardContent } from "@mui/material";
import "./ViewPost.css";
import { CommentList } from "../CommentList/CommentList";

export default function ViewPost({
  data,
  handleSendComment,
  loading,
  handleCommentDelete,
  user,
}) {
  const sanitizedContent = DOMPurify.sanitize(data?.content) || data.content;
  return (
    <div className="viewpost">
      <Card sx={{ minWidth: 275, minHeight: "60%" }}>
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </CardContent>
      </Card>

      <CommentList
        data={data}
        handleSendComment={handleSendComment}
        loading={loading}
        handleCommentDelete={handleCommentDelete}
        user={user}
      />
    </div>
  );
}
