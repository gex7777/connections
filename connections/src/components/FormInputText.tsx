import { Control, Controller, UseControllerProps } from "react-hook-form";
import React from "react";
import { InputProps, TextField, TextFieldProps } from "@mui/material";
import { FormData } from "./PopupForm";
interface Props {
  name: "name";
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
}: Props) => {
  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({
        field: { onChange, value, onBlur, ref },
        fieldState: { error },
      }) => (
        <TextField
          {...inputProps}
          onChange={onChange}
          defaultValue={defaultValue}
          label={label}
          error={!!error}
          onBlur={onBlur} // notify when input is touched/blur
          inputRef={ref}
          helperText={!!error && error.message}
        />
      )}
    />
  );
};
