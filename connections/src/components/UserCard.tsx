import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardHeader, Stack } from "@mui/material";
import { User } from "./UsersGrid";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Diversity3Icon from "@mui/icons-material/Diversity3";
import MenuActions from "./CardMenuActions";
interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader action={<MenuActions userId={user.id} />} />
      <CardActionArea>
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
              <Typography variant="body2" color="text.secondary">
                {user.age}
              </Typography>
            </div>
            <div>
              <Typography gutterBottom variant="h5" component="div">
                <Diversity3Icon /> {user.friends.length}
              </Typography>
            </div>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
