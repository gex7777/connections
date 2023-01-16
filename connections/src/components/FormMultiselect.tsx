import * as React from "react";

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Control, Controller, UseControllerProps } from "react-hook-form";
import { FormData } from "./PopupForm";
import { User } from "./UsersGrid";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

interface Iprops {
  title: string;
  control: Control<FormData>;
  rules?: object;
  users: User[];
  currentUserId?: string;
}

export default function MultipleSelectChip({
  title,
  control,
  rules,
  users,
  currentUserId,
}: Iprops) {
  function getUser(id: string) {
    return users.find((e) => e.id == id);
  }
  if (currentUserId) {
    const friends = getUser(currentUserId)?.friends;
    return (
      <Controller
        rules={rules}
        name="friends"
        control={control}
        render={({ field: { onChange } }) => (
          <FormControl fullWidth margin="dense">
            <InputLabel id="demo-multiple-chip-label">{title}</InputLabel>
            <Select
              onChange={onChange}
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              defaultValue={friends}
              input={<OutlinedInput id="select-multiple-chip" label={title} />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((id) => (
                    <Chip key={id} label={getUser(id)?.name} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {users
                .filter((user: User) => user.id !== currentUserId)
                .map(({ name, id }: User) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      />
    );
  }
  return (
    <Controller
      rules={rules}
      name="friends"
      control={control}
      defaultValue={[]}
      render={({ field: { onChange } }) => (
        <FormControl fullWidth margin="dense">
          <InputLabel id="demo-multiple-chip-label">{title}</InputLabel>
          <Select
            onChange={onChange}
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            defaultValue={[]}
            input={<OutlinedInput id="select-multiple-chip" label={title} />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((id) => (
                  <Chip key={id} label={getUser(id)?.name} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {users.map(({ name, id }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
