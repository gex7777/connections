import UsersGrid from "./components/UsersGrid";
import CssBaseline from "@mui/material/CssBaseline";

import { AddUserButton } from "./components/AddUserButton";
import DefaultAppBar from "./components/AppBar";
import { useStore } from "./state/store";
import CompareFab from "./components/CompareFab";

function App() {
  const selected = useStore((state) => state.selectedUsers);
  return (
    <>
      <CssBaseline />
      <DefaultAppBar />
      <UsersGrid />
      {selected.length === 2 && <CompareFab />}
      <AddUserButton />
    </>
  );
}

export default App;
