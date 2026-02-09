import { Icon } from "@eduriam/ui-core";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import KeyPress from "../KeyPress/KeyPress";

export interface ISearchBar {
  title: string;
  value: string;
  onChange: (text: string) => void;
  onSearchClick: (text: string) => void;
}

const SearchBar: React.FC<ISearchBar> = ({
  title,
  value,
  onChange,
  onSearchClick,
}) => {
  return (
    <Box>
      <InputLabel id="text">{title}</InputLabel>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => onSearchClick(value)}>
                <Icon name="search" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <KeyPress onPress={() => onSearchClick(value)} keys={["Enter"]} />
    </Box>
  );
};

export default SearchBar;
