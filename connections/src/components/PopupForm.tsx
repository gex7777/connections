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

import { useStore } from "./../state/store";
import { Stack } from "@mui/material";
import MultipleSelectChip from "./FormMultiselect";

export interface FormData {
  name: string;
  age: number;
  friends: string[];
}

const validationRules = {
  name: {
    required: "Please input a name",
    maxLength: { value: 30, message: "Name must be 30 characters or less" },
  },
  age: {
    required: "please input an age",
  },
};

function getRandomNumbers() {
  const typedArray = new Uint8Array(10);
  const randomValues = window.crypto.getRandomValues(typedArray);
  return randomValues.join("");
}

export default function PopupForm() {
  const users = useStore((state) => state.users);
  const addUser = useStore((state) => state.addUser);
  const showModal = useStore((state) => state.showModal);
  const setShowModal = useStore((state) => state.setShowModal);
  const userIdToEdit = useStore((state) => state.userIdToEdit);
  const setUserIdToEdit = useStore((state) => state.setUserIdToEdit);
  const editUser = useStore((state) => state.editUser);
  const [open, setOpen] = React.useState(false);
  const { handleSubmit, control } = useForm<FormData>();

  function getUser(id: string) {
    return users.find((e) => e.id == id);
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    let id = getRandomNumbers();
    const userData = { id, ...data };
    addUser(userData);
  };
  const onEditSubmit: SubmitHandler<FormData> = (data) => {
    editUser({ id: userIdToEdit, data: data });
  };
  const handleClickOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setUserIdToEdit(null);
    setShowModal(false);
  };

  if (userIdToEdit) {
    const currentUser = getUser(userIdToEdit);
    console.log(currentUser);
    return (
      <div>
        <Dialog open={showModal} onClose={handleClose}>
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
                defaultValue={currentUser.name}
              />
              <FormInputText
                inputProps={{ margin: "dense", fullWidth: true }}
                name="age"
                control={control}
                label="Age"
                rules={validationRules.age}
                defaultValue={currentUser.age}
              />
              <MultipleSelectChip
                users={users}
                control={control}
                title={"Friends"}
                currentUserId={userIdToEdit}
                defaultValue={currentUser.friends ? currentUser.friends : []}
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
  return (
    <div>
      <Dialog open={showModal} onClose={handleClose}>
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
            <FormInputText
              inputProps={{ margin: "dense", fullWidth: true }}
              name="age"
              control={control}
              label="Age"
              rules={validationRules.age}
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
