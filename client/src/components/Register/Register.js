import React, { useContext, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import "./Register.css";
import { useRegisterMutation } from "../../store/userApi";
import { ToastContext } from "../../context/ToastProvider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Register = ({ open, handleClose }) => {
  const [
    registerUser,
    { data, isSuccess: isRegistrationSuccess, isLoading, error },
  ] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { showToast } = useContext(ToastContext);

  const onSubmit = (data) => {
    console.log(data);
    registerUser(data);
  };

  useEffect(() => {
    if (isRegistrationSuccess) {
      reset();
      showToast("success", "User Registered");
      handleClose();
    } else if (error) {
      const err = error.data;
      showToast("error", err.message);
    }
  }, [isRegistrationSuccess, error, reset]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{"Register"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            placeholder="Name"
            sx={{ borderRadius: 0, outline: "none", mb: "16px" }}
            {...register("name", { required: true })}
          />
          <TextField
            placeholder="Email"
            sx={{ borderRadius: 0, outline: "none", mb: "16px" }}
            {...register("email", { required: true })}
          />
          <TextField
            placeholder="Password"
            type="password"
            sx={{ borderRadius: 0, outline: "none", mb: "16px" }}
            {...register("password", { required: true })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            Close
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={
              errors.email?.type === "required" ||
              errors.password?.type === "required" ||
              errors.name?.type === "required" ||
              isLoading
            }
          >
            Register
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
