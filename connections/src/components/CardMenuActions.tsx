import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useStore } from "../state/store";
import PopupForm from "./PopupForm";
interface Iprops {
  userId: string;
}
export default function MenuActions({ userId }: Iprops) {
  const deleteUser = useStore((state) => state.deleteUser);
  const setUserIdToEdit = useStore((state) => state.setUserIdToEdit);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showEditForm, setShowEditForm] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setShowEditForm(false);
    setAnchorEl(null);
  };
  const handleDelete = () => {
    deleteUser(userId);
  };
  const handleEdit = () => {
    setShowEditForm(true);
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-label="settings"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>delete</MenuItem>
      </Menu>
      {showEditForm && (
        <PopupForm
          opener={showEditForm}
          setShowOpener={setShowEditForm}
          type="EDIT"
          userIdToEdit={userId}
        />
      )}
    </div>
  );
}
