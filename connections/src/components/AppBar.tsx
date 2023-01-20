import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { useStore } from "./../state/store";
import { useEffect } from "react";

export default function DefaultAppBar() {
  const graph = useStore((state) => state.graph);
  useEffect(() => {
    console.log(graph);
  }, [graph]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 3 }}>
          <Diversity3Icon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Connections
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
