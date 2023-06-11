import { Avatar } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthStore";
import { deepOrange, lightBlue } from "@mui/material/colors";

export default function UserAvatar() {
  // Logic for fetching user
  const { user } = useContext(AuthContext);

  return (
    <Avatar
      sx={{
        bgcolor: lightBlue[800],
        width: 28,
        height: 28,
        objectFit: "contain",
      }}
    >
      {user?.username?.charAt(0).toUpperCase()}
    </Avatar>
  );
}
