import { memo, useContext, useEffect, Suspense, lazy } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";
import { NoteSkel } from "../../../../components";

import { AuthContext } from "../../../../context/auth/AuthStore";

import axiosInstance from "../../../../service/axiosInstance";
import { notesRoute } from "../../../../service/routes";
import { NoteContext } from "../../../../context/NoteStore";
import { AlertContext } from "../../../../context/AlertStore";

function Notes() {
  const NoteItem = lazy(() => import("./NoteItem"));
  const { user } = useContext(AuthContext);
  const { noteDispatch, notes } = useContext(NoteContext);
  const { dispatchAlert } = useContext(AlertContext);

  useEffect(() => {
    (async () => {
      noteDispatch({ type: "FETCH_NOTES_START" });
      try {
        const { data } = await axiosInstance.get(notesRoute);
        if (data?.success) {
          noteDispatch({
            type: "FETCH_NOTES_SUCCESS",
            payload: { notes: data?.payload?.notes },
          });

          if (data?.payload?.notes.length < 1) {
            return dispatchAlert({
              type: "SET_INFO",
              payload: {
                // infoMsg: `It seems like you haven't created any note yet.`,
                infoMsg: `No Notes Found`,
              },
            });
          } else {
            return dispatchAlert({
              type: "SET_SUCCESS",
              payload: {
                successMsg: data?.msg,
              },
            });
          }
        }
      } catch (error) {
        const data = error?.response?.data;
        noteDispatch({
          type: "FETCH_NOTES_FAILURE",
          payload: {
            // If any network error occurs, It would be shown in the Alert comp. not on the whole screen
            textError: data?.msg || error?.message || null,
          },
        });
        dispatchAlert({
          type: "SET_ERROR",
          payload: { errorMsg: data?.msg || error?.message || null },
        });
      }
    })();
  }, []);

  if (!Boolean(user))
    return (
      <Typography variant="caption1" fontWeight="bold" color="Highlight">
        Login to Add Notes
      </Typography>
    );

  return (
    <Grid container spacing={2}>
      {notes.map((note) => {
        return (
          <Grid key={note._id} xs={12} sm={6} md={4}>
            <Suspense fallback={<NoteSkel />}>
              <NoteItem note={note} />
            </Suspense>
          </Grid>
        );
      })}
      {notes.length < 1 && (
        <Typography variant="body2" color="text.secondary">
          No Notes to Show
        </Typography>
      )}
    </Grid>
  );
}

const MemoizedNotes = memo(Notes);

export default MemoizedNotes;
