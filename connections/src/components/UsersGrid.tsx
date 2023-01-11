import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import UserCard from "./UserCard";
import Container from "@mui/material/Container";
export interface User {
  id: string;
  name: string;
  age: number;
}
const users: User[] = [
  {
    id: "1",
    name: "mike",
    age: 44,
  },
  {
    id: "2",
    name: "charles",
    age: 84,
  },
  {
    id: "3",
    name: "mew",
    age: 4,
  },
];
export default function UsersGrid() {
  return (
    <Container sx={{ paddingTop: 5 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {users.map((user, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
