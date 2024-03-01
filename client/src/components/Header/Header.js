import React from "react";
import "./Header.css";
import HeaderMenu from "./HeaderMenu";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";

export const Header = ({ handleTopContributersClick, handlePostsClick }) => {
  const handleDelete = () => {};
  const handleAboutClick = () => {};
  const handleLogout = () => {};
  const handleViewMyPosts = () => {};

  return (
    <div className="header">
      <div className="first">
        <DynamicFeedOutlinedIcon fontSize="large" />
        <div className="customButton" onClick={handleTopContributersClick}>
          TOP CONTRIBUTORS
        </div>
      </div>
      <div className="second">
        <div className="customButton" onClick={handlePostsClick}>
          View POSTS
        </div>
        <HeaderMenu
          handleDelete={handleDelete}
          handleAboutClick={handleAboutClick}
          handleLogout={handleLogout}
          handleViewMyPosts={handleViewMyPosts}
        />
      </div>
    </div>
  );
};
