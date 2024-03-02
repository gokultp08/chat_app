import React from "react";
import "./TopPosts.css";
import TopPostItem from "./TopPostItem";
import { useGetTopContributersQuery } from "../../store/userApi";

export const TopPosts = () => {
  const { data, isLoading, error } = useGetTopContributersQuery();

  if (isLoading) {
    return <div>Loading..............................</div>;
  }

  return (
    <div className="topPost">
      {data.map((item, index) => (
        <TopPostItem item={item} key={index} index={index} />
      ))}
    </div>
  );
};
