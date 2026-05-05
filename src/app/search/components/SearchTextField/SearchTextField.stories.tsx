import { ComponentMeta, ComponentStory } from "@storybook/react";

import SearchTextField, { ISearchTextField } from "./SearchTextField";
import { mockSearchTextFieldProps } from "./SearchTextField.mocks";

export default {
  title: "pages/search/SearchTextField",
  component: SearchTextField,
  argTypes: {},
} as ComponentMeta<typeof SearchTextField>;

const Template: ComponentStory<typeof SearchTextField> = (args) => (
  <SearchTextField {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockSearchTextFieldProps.base,
} as ISearchTextField;

