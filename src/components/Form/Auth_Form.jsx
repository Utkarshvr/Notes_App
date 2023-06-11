import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Services
import { loginRoute, signupRoute } from "../../service/routes";
import axiosInstance from "../../service/axiosInstance";

// MUI
import { Button, FormGroup, TextField } from "@mui/material";

// Context
import { AuthContext } from "../../context/auth/AuthStore";
import { AlertContext } from "../../context/AlertStore";

export default function Auth_Form({ variant, inputs }) {
  const [credentials, setCredentials] = useState(
    variant === "register"
      ? {
          username: "",
          email: "",
          password: "",
        }
      : {
          username: "",
          password: "",
        }
  );

  // using the auth context
  const { loading, dispatch, fieldErrors } = useContext(AuthContext);
  // Alett context
  const { dispatchAlert } = useContext(AlertContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Start Process
    dispatch({ type: "LOGIN_START" });

    // Fetching
    try {
      const { data } = await axiosInstance.post(
        variant === "register" ? signupRoute : loginRoute,
        credentials
      );
      if (data?.success) {
        try {
          // success && Save the user in context
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user: data.payload.user, successMsg: data.msg },
          });
          dispatchAlert({
            type: "SET_SUCCESS",
            payload: { successMsg: data.msg },
          });
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      // Not all errors have the response & data in the object.
      // To avoid errors, you may do something like this
      const data = error?.response?.data;

      dispatch({
        type: "LOGIN_FAILURE",
        payload: {
          fieldErrors: data?.error?.errors || [],
          textError: data?.msg || error?.message || null,
        },
      });
      dispatchAlert({
        type: "SET_ERROR",
        payload: {
          // If any network error occurs, It would be shown in the Alert comp. not on the whole screen
          errorMsg: data?.msg || error?.message || null,
        },
      });
    }
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup
        sx={{
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          mt: 5,
        }}
      >
        {inputs.map(({ type, name, placeholder }, i) => (
          <TextField
            sx={{ minWidth: 300 }}
            key={i}
            variant="standard"
            value={credentials.name}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={(e) => handleChange(e)}
            error={fieldErrors?.some((err) => err?.path === name)}
            helperText={fieldErrors?.find((err) => err?.path === name)?.msg}
          />
        ))}
        <Button variant="contained" disabled={loading} type="submit">
          {variant === "register" ? "Register" : "Login"}
        </Button>
        {variant === "register" ? (
          <span>
            Already have an account ?{" "}
            <Link to="/login">
              <Button variant="text">Login</Button>
            </Link>
          </span>
        ) : (
          <span>
            Don't have an account ?{" "}
            <Link to="/signup">
              <Button variant="text">Signup</Button>
            </Link>
          </span>
        )}
      </FormGroup>
    </form>
  );
}
