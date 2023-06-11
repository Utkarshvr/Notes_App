import { Button, FormGroup, TextField, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthStore";
import { NoteContext } from "../../context/NoteStore";
import { notesRoute } from "../../service/routes";
import axiosInstance from "../../service/axiosInstance";
import { AlertContext } from "../../context/AlertStore";
import { ModalContext } from "../../context/ModalContext";

const inputs = [
  { type: "text", name: "title", placeholder: "Title" },
  { type: "text", name: "desc", placeholder: "Description" },
];

const initialNoteField = { title: "", desc: "" };

export default function NoteForm({ role, noteID }) {
  const [notes, setNotes] = useState(initialNoteField);

  const { user } = useContext(AuthContext);
  const { noteDispatch, fieldErrors, loading } = useContext(NoteContext);
  // Alert context
  const { dispatchAlert } = useContext(AlertContext);
  // Modal Context
  const { dispatchModal } = useContext(ModalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Start Process
    noteDispatch({ type: "CREATE_NOTE_START" });

    // Creating
    try {
      if (role === "Add") {
        const { data } = await axiosInstance.post(notesRoute, notes);
        if (data?.success) {
          try {
            // success && Save the user in context
            noteDispatch({
              type: "CREATE_NOTE_SUCCESS",
              payload: { newNote: data?.payload?.note, successMsg: data?.msg },
            });

            dispatchAlert({
              type: "SET_SUCCESS",
              payload: { successMsg: data?.msg },
            });
            setNotes(initialNoteField);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        const { data } = await axiosInstance.put(
          `${notesRoute}/${noteID}`,
          notes
        );
        if (data?.success) {
          try {
            // success && Save the user in context
            noteDispatch({
              type: "UPDATE_NOTE_SUCCESS",
              payload: {
                noteID,
                updatedNote: data?.payload?.note,
                successMsg: data?.msg,
              },
            });

            dispatchAlert({
              type: "SET_SUCCESS",
              payload: { successMsg: data?.msg },
            });
            dispatchModal({ type: "CLOSE_EDIT_MODAL" });

            setNotes(initialNoteField);
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      const data = error?.response?.data;
      noteDispatch({
        type: "CREATE_NOTE_FAILURE",
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
    setNotes((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup
        sx={{
          gap: 2,
          alignItems: "flex-start",
          justifyContent: "center",
          mt: role === "Edit" ? 0 : 5,
          width: "100%",
          maxWidth: "500px",
        }}
      >
        {role === "Edit" && (
          <Typography variant="h6" color="text.secondary">
            Edit the note
          </Typography>
        )}
        {inputs.map(({ type, name, placeholder }, i) => (
          <TextField
            fullWidth
            multiline={name === "desc" ? true : false}
            key={i}
            variant="standard"
            value={notes[name]}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={(e) => handleChange(e)}
            error={fieldErrors?.some((err) => err?.path === name)}
            helperText={fieldErrors?.find((err) => err?.path === name)?.msg}
            // disabled={!Boolean(user) || loading}
          />
        ))}
        <Button
          variant="contained"
          disabled={!Boolean(user) || loading}
          type="submit"
        >
          {role} Note
        </Button>
      </FormGroup>
    </form>
  );
}
