import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function FilterPost({ value, setValue }) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: 400,
      }}
    >
      <InputBase
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search posts"
      />
      <IconButton type="button" sx={{ p: "10px" }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
