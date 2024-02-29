import React from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home">
      <div className="first"></div>
      <div className="second">
        <LoginForm />
      </div>
    </div>
  );
};
