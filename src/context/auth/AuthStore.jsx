import { createContext, useContext, useEffect, useReducer } from "react";
import { fetchUser } from "../../service/API_Requests/UserRequest";
import { AlertContext } from "../AlertStore";

const INITIAL_STATE = {
  user: null,
  loading: false,
  fieldErrors: [],
  textError: null,
  successMsg: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        textError: null,
        successMsg: null,
        fieldErrors: [],
      };
    case "LOGIN_SUCCESS":
      return {
        user: payload.user,
        successMsg: payload.successMsg,
        loading: false,
        textError: null,
        fieldErrors: [],
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        fieldErrors: payload.fieldErrors,
        textError: payload.textError,
        successMsg: null,
      };
    case "LOGOUT_SUCCESS":
      localStorage.removeItem("user");
      return {
        user: null,
        loading: false,
        fieldErrors: [],
        textError: null,
        successMsg: null,
      };
    case "LOGOUT_FAILURE":
      return {
        ...state,
        loading: false,
        fieldErrors: [],
        textError: payload.textError,
        successMsg: null,
      };
    case "ALREADY_LOGGEDIN":
      return {
        ...state,
        successMsg: payload.successMsg,
      };
    default:
      return state;
  }
};

export default function AuthStore({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const { dispatchAlert } = useContext(AlertContext);

  useEffect(() => {
    (async () => {
      dispatch({ type: "LOGIN_START" });

      const { data, error, userDB, errorWhileFetching } = await fetchUser();
      if (errorWhileFetching) {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: {
            fieldErrors: [],
            textError: null,
          },
        });
        dispatchAlert({
          type: "SET_ERROR",
          payload: {
            errorMsg: data?.msg || error?.message || null,
          },
        });
      } else {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: userDB, successMsg: data.msg },
        });
        dispatchAlert({
          type: "SET_SUCCESS",
          payload: { successMsg: `Welcome back ${userDB?.username}` },
        });
      }
    })();
  }, []);

  const authContextValues = {
    dispatch,
    user: state.user,
    loading: state.loading,
    fieldErrors: state.fieldErrors,
    textError: state.textError,
    successMsg: state.successMsg,
  };

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
}
