import { Fab } from "@mui/material";
import React, { useState } from "react";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PopupForm from "./PopupForm";
const CompareFab = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Fab
        onClick={() => setShowModal(true)}
        variant="extended"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 200,
        }}
      >
        <CompareArrowsIcon sx={{ mr: 1 }} />
        Degree of connection
      </Fab>
      {showModal && (
        <PopupForm
          opener={showModal}
          setShowOpener={setShowModal}
          type="SHOW"
        />
      )}
    </>
  );
};

export default CompareFab;
