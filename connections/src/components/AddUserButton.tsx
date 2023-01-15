import { Fab } from "@mui/material";
import React from "react";

import AddIcon from "@mui/icons-material/Add";
import { useStore } from "./../state/store";
export const AddUserButton = () => {
  const setShowModal = useStore((store) => store.setShowModal);
  return (
    <Fab
      onClick={() => setShowModal(true)}
      variant="extended"
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
      }}
    >
      <AddIcon sx={{ mr: 1 }} />
      Add User
    </Fab>
  );
};
