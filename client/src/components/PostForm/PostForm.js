import React from "react";
import "./PostForm.css";
import { Editor } from "./Editor";

export const PostForm = ({ value, setValue }) => {
  return <Editor value={value} setValue={setValue} />;
};
