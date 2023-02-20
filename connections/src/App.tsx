import UsersGrid from "./components/UsersGrid";
import CssBaseline from "@mui/material/CssBaseline";

import { AddUserButton } from "./components/AddUserButton";
import DefaultAppBar from "./components/AppBar";

function App() {
  return (
    <>
      <CssBaseline />
      <DefaultAppBar />
      <UsersGrid />
      <AddUserButton />
    </>
  );
}

export default App;
