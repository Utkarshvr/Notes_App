import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  openModal: false,
  errorMsg: null,
  infoMsg: null,
  successMsg: null,
  showMsg: false,
};

export const AlertContext = createContext(INITIAL_STATE);

const AlertReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_ERROR":
      return {
        ...INITIAL_STATE,
        showMsg: !state.showMsg,
        errorMsg: payload.errorMsg,
      };
    case "SET_INFO":
      return {
        ...INITIAL_STATE,
        showMsg: !state.showMsg,
        infoMsg: payload.infoMsg,
      };
    case "SET_SUCCESS":
      return {
        ...INITIAL_STATE,
        showMsg: !state.showMsg,
        successMsg: payload.successMsg,
      };
    case "OPEN_EDIT_MODAL":
      return { ...state, openModal: true };
    case "CLOSE_EDIT_MODAL":
      return { ...state, openModal: false };
    default:
      return state;
  }
};

export default function AlertStore({ children }) {
  const [state, dispatchAlert] = useReducer(AlertReducer, INITIAL_STATE);

  const AlertContextValues = {
    dispatchAlert,
    errorMsg: state.errorMsg,
    infoMsg: state.infoMsg,
    successMsg: state.successMsg,
    showMsg: state.showMsg,
    openModal: state.openModal,
  };

  return (
    <AlertContext.Provider value={AlertContextValues}>
      {children}
    </AlertContext.Provider>
  );
}
