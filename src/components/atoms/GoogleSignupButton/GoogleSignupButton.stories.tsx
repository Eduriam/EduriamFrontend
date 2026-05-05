import { ComponentMeta, ComponentStory } from "@storybook/react";

import GoogleSignupButton, { IGoogleSignupButton } from "./GoogleSignupButton";
import { mockGoogleSignupButtonProps } from "./GoogleSignupButton.mocks";

export default {
  title: "atoms/GoogleSignupButton",
  component: GoogleSignupButton,
  argTypes: {},
} as ComponentMeta<typeof GoogleSignupButton>;

const Template: ComponentStory<typeof GoogleSignupButton> = (args) => (
  <GoogleSignupButton {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockGoogleSignupButtonProps.base,
} as IGoogleSignupButton;
