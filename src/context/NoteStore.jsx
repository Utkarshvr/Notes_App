import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  notes: [],
  loading: true,
  openEditModal: false,
  fieldErrors: [],
  textError: null,
  successMsg: null,
};

export const NoteContext = createContext(INITIAL_STATE);

const NoteReducer = (state, { type, payload }) => {
  switch (type) {
    case "FETCH_NOTES_START":
      return {
        ...state,
        fieldErrors: [],
        textError: null,
        successMsg: null,
        loading: true,
      };
    case "FETCH_NOTES_SUCCESS":
      return {
        ...state,
        notes: payload.notes,
        fieldErrors: [],
        textError: null,
        successMsg: null,
        loading: false,
      };
    case "FETCH_NOTES_FAILURE":
      return {
        ...state,
        notes: [],
        fieldErrors: [],
        textError: payload.textError,
        successMsg: null,
        loading: false,
      };
    case "CREATE_NOTE_START":
      return {
        ...state,
        fieldErrors: [],
        textError: null,
        successMsg: null,
        loading: true,
      };
    case "CREATE_NOTE_SUCCESS":
      return {
        ...state,
        notes: [payload.newNote, ...state.notes],
        fieldErrors: [],
        textError: null,
        successMsg: payload.successMsg,
        loading: false,
      };
    case "CREATE_NOTE_FAILURE":
      return {
        ...state,
        fieldErrors: payload.fieldErrors,
        textError: payload.textError,
        successMsg: null,
        loading: false,
      };
    // Deleting
    case "DELETE_NOTE_START":
      return {
        ...state,
        fieldErrors: [],
        textError: null,
        successMsg: null,
        loading: true,
      };
    case "DELETE_NOTE_SUCCESS":
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== payload.noteID),
        fieldErrors: [],
        textError: null,
        successMsg: payload.successMsg,
        loading: false,
      };
    case "DELETE_NOTE_FAILURE":
      return {
        ...state,
        fieldErrors: payload.fieldErrors,
        textError: payload.textError,
        successMsg: null,
        loading: false,
      };
    // Updating
    case "OPEN_EDIT_MODAL":
      return { ...state, openEditModal: true };
    case "CLOSE_EDIT_MODAL":
      return { ...state, openEditModal: false };
    case "UPDATE_NOTE_START":
      return {
        ...state,
        fieldErrors: [],
        textError: null,
        successMsg: null,
        loading: true,
      };
    case "UPDATE_NOTE_SUCCESS":
      const notesWithoutUpdatedNote = state.notes.filter(
        (note) => note._id !== payload.noteID
      );

      return {
        ...state,
        notes: [payload.updatedNote, ...notesWithoutUpdatedNote],
        fieldErrors: [],
        textError: null,
        successMsg: payload.successMsg,
        loading: false,
      };
    case "UPDATE_NOTE_FAILURE":
      return {
        ...state,
        fieldErrors: payload.fieldErrors,
        textError: payload.textError,
        successMsg: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default function NoteStore({ children }) {
  const [state, noteDispatch] = useReducer(NoteReducer, INITIAL_STATE);

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(state.user));
  // }, []);

  const noteContextValues = {
    noteDispatch,
    notes: state.notes,
    loading: state.loading,
    fieldErrors: state.fieldErrors,
    textError: state.textError,
    successMsg: state.successMsg,
    openEditModal: state.openEditModal,
  };

  return (
    <NoteContext.Provider value={noteContextValues}>
      {children}
    </NoteContext.Provider>
  );
}
