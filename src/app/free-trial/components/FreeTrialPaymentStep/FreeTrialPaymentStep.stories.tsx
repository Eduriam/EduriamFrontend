import { ComponentMeta, ComponentStory } from "@storybook/react";

import FreeTrialPaymentStep from "./FreeTrialPaymentStep";

export default {
  title: "free-trial/FreeTrialPaymentStep",
  component: FreeTrialPaymentStep,
} as ComponentMeta<typeof FreeTrialPaymentStep>;

const Template: ComponentStory<typeof FreeTrialPaymentStep> = (args) => (
  <FreeTrialPaymentStep {...args} />
);

export const Base = Template.bind({});

Base.args = {
  canConfirm: false,
  onFormValidityChange: () => undefined,
  onConfirm: () => undefined,
};
