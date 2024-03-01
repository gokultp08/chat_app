import React from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

import "./PostItem.css";

export const PostItem = ({ post, handlePostClick }) => {
  return (
    <div className="postitem" onClick={() => handlePostClick(post)}>
      {JSON.stringify(post)}
    </div>
  );
};
