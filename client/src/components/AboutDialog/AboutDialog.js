import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={() => handleClose(false)}>
      <DialogTitle>About </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is a react app where you can add post using rich text editor,
          edit them, view them, delete them and add comments. Click on 'View
          Posts' to Start !!!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
