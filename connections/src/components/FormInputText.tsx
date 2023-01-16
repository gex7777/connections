import { Control, Controller, UseControllerProps } from "react-hook-form";
import React from "react";
import { InputProps, TextField, TextFieldProps } from "@mui/material";
import { FormData } from "./PopupForm";
interface Props {
  name: "name" | "age";
  control: Control<FormData>;
  label: string;
  rules: object;
  inputProps?: TextFieldProps;
  defaultValue?: string;
}

export const FormInputText = ({
  name,
  control,
  label,
  rules,
  inputProps,
  defaultValue,
}: UseControllerProps<Props>) => {
  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...inputProps}
          onChange={onChange}
          value={value}
          label={label}
          error={!!error}
          helperText={!!error && error.message}
        />
      )}
    />
  );
};
