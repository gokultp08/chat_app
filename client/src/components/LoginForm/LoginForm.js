import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import "./LoginForm.css";
import { useLoginMutation } from "../../store/userApi";
import { setLoggedInUser } from "../../store/appStateSlice";
import { Register } from "../Register/Register";
import { ToastContext } from "../../context/ToastProvider";

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { showToast } = useContext(ToastContext);

  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

  const [
    login,
    { data: loggedInData, isSuccess: isLoginSuccess, isLoading, error },
  ] = useLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (loggedInData) {
      dispatch(setLoggedInUser(loggedInData));
    }
  }, [loggedInData, dispatch]);

  useEffect(() => {
    if (isLoginSuccess) {
      reset();
      showToast("success", "User Logged In");
      navigate("/dashboard");
    } else if (error) {
      const err = error.data;
      showToast("error", err.message);
    }
  }, [isLoginSuccess, navigate, error, reset]);

  const onSubmit = (data) => {
    login(data);
  };

  function handleClose() {
    setRegisterDialogOpen(false);
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder="Email"
          sx={{ borderRadius: 0, outline: "none", mb: "16px" }}
          {...register("email", { required: true })}
        />
        <TextField
          placeholder="Password"
          sx={{ borderRadius: 0, outline: "none", mb: "16px" }}
          {...register("password", { required: true })}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          disabled={errors.email?.type === "required"}
          loading={isLoading}
        >
          Submit
        </LoadingButton>
        <Button
          variant="outlined"
          size="small"
          type="button"
          onClick={() => setRegisterDialogOpen(true)}
        >
          Click to Register
        </Button>
      </form>
      <Register open={registerDialogOpen} handleClose={handleClose} />
    </div>
  );
};
