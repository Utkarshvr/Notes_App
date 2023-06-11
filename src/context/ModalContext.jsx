import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  openModal: false,
  noteID: null,
};

export const ModalContext = createContext(INITIAL_STATE);

const ModalReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "OPEN_EDIT_MODAL":
      return { openModal: true, noteID: payload.noteID };
    case "CLOSE_EDIT_MODAL":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default function ModalStore({ children }) {
  const [state, dispatchModal] = useReducer(ModalReducer, INITIAL_STATE);

  const ModalContextValues = {
    dispatchModal,
    openModal: state.openModal,
    noteID: state.noteID,
  };

  return (
    <ModalContext.Provider value={ModalContextValues}>
      {children}
    </ModalContext.Provider>
  );
}
