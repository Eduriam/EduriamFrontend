"use client";

import { TextField, type TextFieldProps } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

export interface IPasswordTextField
  extends Omit<TextFieldProps, "type" | "endAdornment"> {
  visibilityToggleDataTest?: string;
}

const PasswordTextField: React.FC<IPasswordTextField> = ({
  visibilityToggleDataTest,
  inputProps,
  ...textFieldProps
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation("form");

  return (
    <TextField
      {...textFieldProps}
      type={showPassword ? "text" : "password"}
      inputProps={inputProps}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            data-test={visibilityToggleDataTest}
            edge="end"
            onClick={() => setShowPassword((current) => !current)}
            onMouseDown={(event) => event.preventDefault()}
            onPointerDown={(event) => event.preventDefault()}
            type="button"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default PasswordTextField;
