import * as React from "react";
import {
  experimentalStyled as styled,
  getContrastRatio,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import UserCard from "./UserCard";
import Container from "@mui/material/Container";
import { useStore } from "./../state/store";
import { useEffect } from "react";
import { GraphUtil } from "graphs-for-js";

export interface User {
  id: string;
  name: string;
  friends: string[];
}

export default function UsersGrid() {
  const users = useStore((state) => state.users);
  const graph = useStore((state) => state.graph);
  //
  useEffect(() => {
    console.log(
      graph,
      GraphUtil.findShortestPath(
        graph,
        "6223243142952152342280170",
        "1031291921461649822722810123"
      ),
      users
    );
  }, [graph]);
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
