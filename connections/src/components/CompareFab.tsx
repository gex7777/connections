import { Fab } from "@mui/material";
import React, { useState } from "react";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PopupForm from "./PopupForm";
const CompareFab = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Fab
        variant="extended"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 200,
        }}
      >
        <CompareArrowsIcon sx={{ mr: 1 }} />
        Compare
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
