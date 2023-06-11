import { useContext } from "react";

import IconButton from "@mui/material/IconButton";

// Theme Icon
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeContext } from "../..";

export default function ToggleThemeBtn() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  return (
    <>
      <IconButton
        onClick={() => setDarkMode((prev) => !prev)}
        size="large"
        color="inherit"
      >
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </>
  );
}
