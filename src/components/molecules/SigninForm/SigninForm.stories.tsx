import { ComponentMeta, ComponentStory } from "@storybook/react";

import SigninForm, { ISigninForm } from "./SigninForm";
import { mockSigninFormProps } from "./SigninForm.mocks";

export default {
  title: "molecules/SigninForm",
  component: SigninForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof SigninForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SigninForm> = (args) => (
  <SigninForm {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockSigninFormProps.base,
} as ISigninForm;
