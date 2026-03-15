import { ComponentMeta, ComponentStory } from "@storybook/react";

import FreeTrialReminderStep from "./FreeTrialReminderStep";

export default {
  title: "free-trial/FreeTrialReminderStep",
  component: FreeTrialReminderStep,
} as ComponentMeta<typeof FreeTrialReminderStep>;

const Template: ComponentStory<typeof FreeTrialReminderStep> = (args) => (
  <FreeTrialReminderStep {...args} />
);

export const Base = Template.bind({});

Base.args = {
  onStart: () => undefined,
};
