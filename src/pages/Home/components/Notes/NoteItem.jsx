import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// Others
import { UserAvatar } from "../../../../components";
import NoteMenu from "./NoteMenu";

// Date-fns
import { formatDistanceToNow } from "date-fns";

export default function NoteItem({ note }) {
  const { title, desc, creator, updatedAt, _id } = note;

  return (
    <Card id={_id}>
      <CardHeader
        avatar={<UserAvatar />}
        action={<NoteMenu noteID={_id} />}
        title={creator.username}
        subheader={formatDistanceToNow(new Date(updatedAt), {
          addSuffix: true,
        })}
      />
      <CardContent>
        <Typography variant="h6" color="text.primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
    </Card>
  );
}
