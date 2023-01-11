import Fab from "@mui/material/Fab";
import { useState } from "react";
import ButtonAppBar from "./components/ButtonAppBar";
import AddIcon from "@mui/icons-material/Add";
import UsersGrid from "./components/UsersGrid";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <>
      <CssBaseline />
      <ButtonAppBar />
      <Fab
        variant="extended"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add User
      </Fab>
      <UsersGrid />
    </>
  );
}

export default App;
