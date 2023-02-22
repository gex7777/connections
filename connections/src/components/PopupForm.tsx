import * as React from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { SubmitHandler, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { FormInputText } from "./FormInputText";

import { useStore } from "../state/store";
import { Stack } from "@mui/material";
import MultipleSelectChip from "./FormMultiselect";
import { User } from "./UsersGrid";
import { useEffect } from "react";

export interface FormData {
  name: string;

  friends: string[];
}

const validationRules = {
  name: {
    required: "Please input a name",
    maxLength: { value: 30, message: "Name must be 30 characters or less" },
  },
};

function getRandomNumbers() {
  const typedArray = new Uint8Array(10);
  const randomValues = window.crypto.getRandomValues(typedArray);
  return randomValues.join("");
}
type PopupTypes = "ADD" | "EDIT" | "SHOW";

interface Props {
  type: PopupTypes;
  userIdToEdit?: string;
  opener: boolean;
  setShowOpener: (v: boolean) => void;
}

export default function PopupForm({
  type,
  opener,
  setShowOpener,
  userIdToEdit,
}: Props) {
  const users = useStore((state) => state.users);
  const addUser = useStore((state) => state.addUser);
  const selected = useStore((state) => state.selectedUsers);
  const editUser = useStore((state) => state.editUser);

  const { handleSubmit, control, reset } = useForm<FormData>();

  function getUser(id: string): User | undefined {
    return users.find((e) => e.id == id);
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    let id = getRandomNumbers();
    const userData = { id, ...data };
    addUser(userData);
  };
  const onEditSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    if (!!userIdToEdit) {
      editUser({ id: userIdToEdit, data: data });
    }
    setShowOpener(false);
  };

  const handleClose = () => {
    setShowOpener(false);
  };

  if (userIdToEdit && type === "EDIT") {
    const currentUser = getUser(userIdToEdit);
    console.log(currentUser);

    return (
      <div>
        <Dialog open={opener} onClose={handleClose}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <Box
              margin={5}
              component={"form"}
              onSubmit={handleSubmit(onEditSubmit)}
            >
              <FormInputText
                inputProps={{ margin: "dense", fullWidth: true }}
                name="name"
                control={control}
                label="Name"
                rules={validationRules.name}
                defaultValue={currentUser?.name}
              />

              <MultipleSelectChip
                userIdToEdit={userIdToEdit}
                users={users}
                control={control}
                title={"Friends"}
                defaultValue={currentUser?.friends}
              />
              <Stack spacing={2} marginTop={5} direction="row">
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Stack>
            </Box>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>
    );
  }
  if (type === "SHOW") {
    return (
      <div>
        <Dialog open={opener} onClose={handleClose}>
          <DialogTitle>Degree of seperation</DialogTitle>
        </Dialog>
      </div>
    );
  }
  return (
    <div>
      <Dialog open={opener} onClose={handleClose}>
        <DialogTitle>add user</DialogTitle>
        <DialogContent>
          <Box margin={5} component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <FormInputText
              inputProps={{ margin: "dense", fullWidth: true }}
              name="name"
              control={control}
              label="Name"
              rules={validationRules.name}
            />

            <MultipleSelectChip
              users={users}
              control={control}
              title={"Friends"}
            />
            <Stack spacing={2} marginTop={5} direction="row">
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
