import { ComponentMeta, ComponentStory } from "@storybook/react";

import FreeTrialActivatedStep from "./FreeTrialActivatedStep";

export default {
  title: "free-trial/FreeTrialActivatedStep",
  component: FreeTrialActivatedStep,
} as ComponentMeta<typeof FreeTrialActivatedStep>;

const Template: ComponentStory<typeof FreeTrialActivatedStep> = (args) => (
  <FreeTrialActivatedStep {...args} />
);

export const Base = Template.bind({});

Base.args = {
  onContinue: () => undefined,
};
