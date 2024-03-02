import React, { useContext, useEffect, useState } from "react";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteMutation } from "../../store/userApi";
import "./Header.css";
import { logout } from "../../store/appStateSlice";
import { ToastContext } from "../../context/ToastProvider";
import AlertDialog from "../AboutDialog/AboutDialog";
import HeaderMenu from "./HeaderMenu";

export const Header = ({ handleTopContributersClick, handlePostsClick }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.appState.user);

  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);

  const { showToast } = useContext(ToastContext);

  const handleDelete = () => {
    deleteUser(user.id);
  };

  const handleAboutClick = () => {
    setIsAboutDialogOpen(true);
  };

  const handleLogout = () => {
    showToast("success", "User Logged Out");
    dispatch(logout());
  };

  const handleViewMyPosts = () => {
    navigate("/dashboard/posts/my_feed");
  };

  const [deleteUser, { data, isSuccess: isDeleteSuccess, isLoading, error }] =
    useDeleteMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      showToast("success", "User Deleted");
      navigate("/");
    } else if (error) {
      const err = error.data;
      showToast("error", err.message);
    }
  }, [isDeleteSuccess, error]);

  return (
    <div className="header">
      <div className="first">
        <DynamicFeedOutlinedIcon fontSize="large" />
        <div className="customButton" onClick={handleTopContributersClick}>
          TOP CONTRIBUTORS
        </div>
      </div>
      <div className="second">
        <div className="customButton" onClick={handlePostsClick}>
          FEED
        </div>
        <HeaderMenu
          handleDelete={handleDelete}
          handleAboutClick={handleAboutClick}
          handleLogout={handleLogout}
          handleViewMyPosts={handleViewMyPosts}
        />
      </div>
      <AlertDialog
        open={isAboutDialogOpen}
        handleClose={setIsAboutDialogOpen}
      />
    </div>
  );
};
