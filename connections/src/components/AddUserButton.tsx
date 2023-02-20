import { Fab } from "@mui/material";
import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { useStore } from "./../state/store";
import PopupForm from "./PopupForm";
export const AddUserButton = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
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
      {showModal && (
        <PopupForm opener={showModal} setShowOpener={setShowModal} type="ADD" />
      )}
    </>
  );
};
