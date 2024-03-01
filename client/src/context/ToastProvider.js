import React, { createContext, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastContext = createContext();

const defaultProps = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Bounce,
};

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  const showToast = (type = "success" | "error" | "info", message) => {
    setMessage(message);
    switch (type) {
      case "success":
        toast.success(message, {
          ...defaultProps,
        });
        break;

      case "error":
        toast.error(message, {
          ...defaultProps,
        });
        break;

      case "info":
        toast.info(message, {
          ...defaultProps,
        });
        break;

      default:
        break;
    }
  };

  return (
    <ToastContext.Provider value={{ message, showToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
