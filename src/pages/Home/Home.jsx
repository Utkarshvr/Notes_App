import { lazy } from "react";

import { Divider } from "@mui/material";
import { NoteForm } from "../../components";
import Notes from "./components/Notes/Notes";

const EditNote = lazy(() => import("../../components/Modal/EditNote"));

export default function Home() {
  return (
    <>
      <NoteForm role={"Add"} />
      <Divider sx={{ my: 5 }} textAlign="left">
        Your Notes
      </Divider>
      <Notes />
      <EditNote />
    </>
  );
}
