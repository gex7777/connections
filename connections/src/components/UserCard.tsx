import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Button,
  CardActionArea,
  CardActions,
  CardHeader,
  Stack,
} from "@mui/material";
import { User } from "./UsersGrid";

import Diversity3Icon from "@mui/icons-material/Diversity3";
import MenuActions from "./CardMenuActions";
import { useStore } from "../state/store";
import { useEffect } from "react";
interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  const addSelected = useStore((state) => state.addSelected);
  const selected = useStore((state) => state.selectedUsers);
  useEffect(() => console.log(selected), [selected]);
  return (
    <Card
      sx={{
        maxWidth: 345,
        bgcolor: selected.includes(user.id) ? "burlywood" : "",
      }}
    >
      <CardHeader action={<MenuActions userId={user.id} />} />

      <CardMedia
        component="img"
        height="140"
        image={`https://robohash.org/${user.id}size=300x300`}
        alt="green iguana"
      />
      <CardContent>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <div>
            <Typography gutterBottom variant="h5" component="div">
              {user.name}
            </Typography>
          </div>
          <div>
            <Stack direction={"row-reverse"}>
              <Diversity3Icon />
              <Typography gutterBottom variant="h5" component="div">
                {user.friends.length}
              </Typography>
            </Stack>
            <Stack direction={"row"}>
              {user.friends.map((friend) => (
                <Avatar
                  key={friend}
                  alt="Remy Sharp"
                  src={`https://robohash.org/${friend}size=300x300`}
                />
              ))}
            </Stack>
          </div>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <Button onClick={() => addSelected(user)} size="small">
          {selected.includes(user.id) ? "Unselect" : "Select"}
        </Button>
      </CardActions>
    </Card>
  );
}
