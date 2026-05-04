import { ComponentMeta, ComponentStory } from "@storybook/react";

import PasswordTextField, { IPasswordTextField } from "./PasswordTextField";

export default {
  title: "molecules/PasswordTextField",
  component: PasswordTextField,
  argTypes: {},
} as ComponentMeta<typeof PasswordTextField>;

const Template: ComponentStory<typeof PasswordTextField> = (args) => (
  <PasswordTextField {...args} />
);

export const Base = Template.bind({});

Base.args = {
  placeholder: "Heslo",
  fullWidth: true,
  autoComplete: "new-password",
  visibilityToggleDataTest: "password-visibility-toggle-button",
} as IPasswordTextField;
