import Fab from "@mui/material/Fab";
import { useEffect, useState } from "react";
import ButtonAppBar from "./components/AppBar";
import AddIcon from "@mui/icons-material/Add";
import UsersGrid, { User } from "./components/UsersGrid";
import CssBaseline from "@mui/material/CssBaseline";
import PopupForm from "./components/PopupForm";
import { AddUserButton } from "./components/AddUserButton";
import DefaultAppBar from "./components/AppBar";

function App() {
  return (
    <>
      <CssBaseline />
      <DefaultAppBar />
      <UsersGrid />
      <AddUserButton />
      <PopupForm />
    </>
  );
}

export default App;
