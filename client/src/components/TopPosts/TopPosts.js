import React from "react";
import "./TopPosts.css";
import TopPostItem from "./TopPostItem";

export const TopPosts = () => {
  return (
    <div className="topPost">
      <TopPostItem />
      <TopPostItem />

      <TopPostItem />
    </div>
  );
};
