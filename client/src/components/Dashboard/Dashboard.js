import React from "react";

import { Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { Header } from "../Header/Header";
export const Dashboard = () => {
  const navigate = useNavigate();

  const handleTopContributersClick = () => {
    navigate("/dashboard");
  };
  const handlePostsClick = () => {
    navigate("/dashboard/posts");
  };

  return (
    <div className="dashboard">
      <Header
        handleTopContributersClick={handleTopContributersClick}
        handlePostsClick={handlePostsClick}
      />
      <Outlet />
    </div>
  );
};
