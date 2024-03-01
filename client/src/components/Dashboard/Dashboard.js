import React from "react";
import "./Dashboard.css";
import { Header } from "../Header/Header";
import { Outlet, useNavigate } from "react-router-dom";

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
