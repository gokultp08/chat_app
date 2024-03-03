import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { Tooltip } from "@mui/material";

export default function NewComment({ handleSendComment, loading }) {
  const [value, setValue] = React.useState("");
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        border: "1px solid #178582",
      }}
    >
      <InputBase
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        multiline
        maxRows={3}
      />
      <Tooltip title="Add Comment">
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          onClick={() => handleSendComment(value)}
          disabled={loading}
          style={{ color: "#178582" }}
        >
          <SendIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}
