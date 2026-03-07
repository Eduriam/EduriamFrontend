import { action } from "@storybook/addon-actions";

import { ISearchTextField } from "./SearchTextField";

const base: ISearchTextField = {
  value: "",
  placeholder: "Name or Username",
  onChange: action("onChange"),
};

export const mockSearchTextFieldProps = {
  base,
};

