import React from "react";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import { LoginForm } from "../LoginForm/LoginForm";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home">
      <div className="home_first">
        <DynamicFeedOutlinedIcon
          style={{ color: "#BFA181", fontSize: "10rem" }}
        />
      </div>
      <div className="home_second">
        <LoginForm />
      </div>
    </div>
  );
};
