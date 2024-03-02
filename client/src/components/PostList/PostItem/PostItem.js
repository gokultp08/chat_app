import React from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import Person4Icon from "@mui/icons-material/Person4";
import DOMPurify from "dompurify";
import Tooltip from "@mui/material/Tooltip";

import "./PostItem.css";

export const PostItem = ({ post, handlePostClick }) => {
  const sanitizedContent =
    DOMPurify.sanitize(post?.content.substring(0, 100)) ||
    post.content.substring(0, 100);

  return (
    <div className="postitem">
      <div className="post_title_content">
        <div className="post_title">
          <Person4Icon />
          {post.authorId}
        </div>
        <Tooltip title="Open Post">
          <OpenInFullIcon
            className="open_icon"
            onClick={() => handlePostClick(post)}
          />
        </Tooltip>
      </div>
      <div className="content">
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizedContent,
          }}
        />
        <div>Comments: {post.Comment.length}</div>
      </div>
    </div>
  );
};
