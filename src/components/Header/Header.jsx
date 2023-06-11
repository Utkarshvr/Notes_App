import { useContext } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ToggleThemeBtn from "./ToggleThemeBtn";
import { Link } from "react-router-dom";

import UserMenu from "./UserMenu";
import { Button, IconButton, Stack } from "@mui/material";

import { AuthContext } from "../../context/auth/AuthStore";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link to="/">
          <Stack alignItems="center" direction="row" spacing={0.5}>
            <Typography
              sx={{ display: { xs: "none", sm: "flex" } }}
              variant="h6"
              noWrap
              component="div"
            >
              KEEP NOTES{" "}
            </Typography>
            <IconButton>
              <img
                width="24"
                height="24"
                src={"/notes-logo.png"}
                alt={"LOGO"}
              />
            </IconButton>
          </Stack>
        </Link>

        {/* Fill the space between */}
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex" }}>
          <ToggleThemeBtn />
          {user ? (
            <UserMenu />
          ) : (
            <Stack alignItems="center" direction="row" spacing={1}>
              {["login", "signup"].map((role) => {
                return (
                  <Link key={role} to={`/${role}`}>
                    <Button
                      color="inherit"
                      size="small"
                      variant={role === "login" ? "outlined" : "text"}
                    >
                      {role === "login" ? "Login" : "Signup"}
                    </Button>
                  </Link>
                );
              })}
            </Stack>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
