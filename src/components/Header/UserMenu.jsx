import { useContext, useState } from "react";

import IconButton from "@mui/material/IconButton";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserAvatar from "../User/UserAvatar";

import axiosInstance from "../../service/axiosInstance";
import { logoutRoute } from "../../service/routes";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth/AuthStore";
import { AlertContext } from "../../context/AlertStore";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Using auth context
  const { dispatch } = useContext(AuthContext);
  const { dispatchAlert } = useContext(AlertContext);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };

  const handleLogout = async () => {
    handleClose();
    try {
      const { data } = await axiosInstance.post(logoutRoute);
      if (data?.success) {
        dispatch({ type: "LOGOUT_SUCCESS" });
        dispatchAlert({
          type: "SET_SUCCESS",
          payload: { successMsg: data?.msg },
        });
        navigate("/login");
      }
    } catch (error) {
      const data = error?.response?.data;
      dispatchAlert({
        type: "SET_ERROR",
        payload: { errorMsg: data?.msg || error?.message || null },
      });
    }
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small" edge="end" color="inherit">
        <UserAvatar />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
