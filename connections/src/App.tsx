import Fab from "@mui/material/Fab";
import { useEffect, useState } from "react";
import ButtonAppBar from "./components/ButtonAppBar";
import AddIcon from "@mui/icons-material/Add";
import UsersGrid from "./components/UsersGrid";
import CssBaseline from "@mui/material/CssBaseline";
import PopupForm from "./components/PopupForm";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    Object.keys(users).length !== 0 && setUsers(users);
  }, []);
  return (
    <>
      <CssBaseline />
      <ButtonAppBar />

      <UsersGrid />
      <PopupForm />
    </>
  );
}

export default App;
