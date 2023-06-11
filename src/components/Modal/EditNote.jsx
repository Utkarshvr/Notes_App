import Modal from "@mui/material/Modal";
import NoteForm from "../Form/NoteForm";
import { useContext } from "react";
import { Paper } from "@mui/material";
import { ModalContext } from "../../context/ModalContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  width: "90%",
  boxShadow: 24,
  p: 4,
};

export default function EditNote() {
  const { openModal, dispatchModal, noteID } = useContext(ModalContext);

  const handleClose = () => dispatchModal({ type: "CLOSE_EDIT_MODAL" });
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={style} variant="outlined">
        <NoteForm role={"Edit"} noteID={noteID} />
      </Paper>
    </Modal>
  );
}
