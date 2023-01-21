import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, CardHeader, Stack } from "@mui/material";
import { User } from "./UsersGrid";

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
      </CardActionArea>
    </Card>
  );
}
