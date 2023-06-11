import { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import axiosInstance from "../../../../service/axiosInstance";
import { notesRoute } from "../../../../service/routes";
import { NoteContext } from "../../../../context/NoteStore";
import { AlertContext } from "../../../../context/AlertStore";
import { ModalContext } from "../../../../context/ModalContext";

export default function NoteMenu({ noteID }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // note Context
  const { noteDispatch, loading } = useContext(NoteContext);
  // Alert context
  const { dispatchAlert } = useContext(AlertContext);

  // Modal Context
  const { dispatchModal } = useContext(ModalContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    dispatchModal({ type: "OPEN_EDIT_MODAL", payload: { noteID } });
  };
  const handleDelete = async () => {
    handleClose();
    // CLOSING is taking too long, since on calling noteDispatch, first Notes.jsx is re-rendered
    noteDispatch({ type: "DELETE_NOTE_START" });

    try {
      const { data } = await axiosInstance.delete(`${notesRoute}/${noteID}`);

      if (data?.success) {
        try {
          // success && update the note in context
          noteDispatch({
            type: "DELETE_NOTE_SUCCESS",
            payload: { noteID, successMsg: data.msg },
          });
          dispatchAlert({
            type: "SET_SUCCESS",
            payload: { successMsg: data.msg },
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      // Not all errors have the response & data in the object.
      // To avoid errors, you may do something like this
      const data = error?.response?.data;

      noteDispatch({
        type: "DELETE_NOTE_FAILURE",
        payload: {
          fieldErrors: data?.error?.errors || [],
          textError: data?.msg || error?.message || null,
        },
      });
      dispatchAlert({
        type: "SET_ERROR",
        payload: {
          // If any network error occurs, It would be shown in the Alert comp. not on the whole screen
          textError: data?.msg || error?.message || null,
        },
      });
    }
  };
  return (
    <>
      <IconButton onClick={handleClick} size="small" edge="end" color="inherit">
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem disabled={loading} onClick={handleEdit}>
          Edit
        </MenuItem>
        <MenuItem disabled={loading} onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
