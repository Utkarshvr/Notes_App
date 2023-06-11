import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import { useState, useContext, useEffect, forwardRef } from "react";
// import { AuthContext } from "../../context/auth/AuthStore";

import MuiAlert from "@mui/material/Alert";
// import { NoteContext } from "../../context/NoteStore";
import { AlertContext } from "../../context/AlertStore";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomAlert() {
  // using the auth context
  const { errorMsg, infoMsg, successMsg, showMsg } = useContext(AlertContext);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(Boolean(errorMsg) || Boolean(infoMsg) || Boolean(successMsg));
  }, [showMsg]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      <Alert
        onClose={handleClose}
        severity={
          errorMsg ? "error" : infoMsg ? "info" : successMsg ? "success" : null
        }
        sx={{ width: "100%" }}
      >
        {errorMsg || infoMsg || successMsg}
      </Alert>
    </Snackbar>
  );
}
