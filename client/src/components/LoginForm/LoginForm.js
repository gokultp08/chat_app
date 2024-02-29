import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { useLoginMutation } from "../../store/userApi";
import { setLoggedInUser } from "../../store/appStateSlice";

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      navigate("/dashboard");
    } else if (error) {
      const err = error.data;
      console.log(err.message);
    }
  }, [isLoginSuccess, navigate, error, reset]);

  const onSubmit = (data) => {
    login(data);
  };

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
      </form>
    </div>
  );
};
