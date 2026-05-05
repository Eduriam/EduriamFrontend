"use client";

import { Icon } from "@eduriam/ui-core";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

export interface ISearchTextField {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  "data-test"?: string;
}

const SearchTextField: React.FC<ISearchTextField> = ({
  value,
  placeholder,
  onChange,
  "data-test": dataTest,
}) => {
  return (
    <TextField
      fullWidth
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      data-test={dataTest}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon name="search" />
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "background.default",
          borderRadius: "12px",
          "& fieldset": {
            borderWidth: "1.5px",
          },
        },
        "& .MuiInputBase-input": {
          py: "16px",
          fontSize: "16px",
          lineHeight: "19.4px",
        },
      }}
    />
  );
};

export default SearchTextField;
