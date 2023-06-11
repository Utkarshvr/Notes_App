import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthStore";
import { UserAvatar } from "../../components";

// MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import { Button, Typography } from "@mui/material";

export default function Profile() {
  const {
    user: { createdAt, email, updatedAt, username },
  } = useContext(AuthContext);

  return (
    <Card sx={{ maxWidth: 400, my: 4, mx: "auto" }}>
      <CardHeader avatar={<UserAvatar />} />

      <CardContent>
        <div>
          {[
            { type: "Username", value: username },
            { type: "Email", value: email },
            { type: "Created At", value: new Date(createdAt).toDateString() },
            {
              type: "Last Updated At",
              value: new Date(updatedAt).toDateString(),
            },
          ].map(({ type, value }) => (
            <Typography
              key={type}
              textAlign="start"
              variant="h6"
              color="text.secondary"
            >
              {type}:{" "}
              <Typography variant="body2" color="primary" component="span">
                {value}
              </Typography>
            </Typography>
          ))}
        </div>
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="inherit" size="small">
          Edit Profile
        </Button>
        <Button variant="outlined" color="error" size="small">
          Delete Profile
        </Button>
      </CardActions>
    </Card>
  );
}
