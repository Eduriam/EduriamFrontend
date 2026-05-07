import { ComponentMeta, ComponentStory } from "@storybook/react";

import AchievementBadge, { IAchievementBadge } from "./AchievementBadge";
import { mockAchievementBadgeProps } from "./AchievementBadge.mocks";

export default {
  title: "pages/users/[userId]/AchievementBadge",
  component: AchievementBadge,
  argTypes: {
    size: {
      control: "select",
      options: ["medium", "large"],
    },
  },
} as ComponentMeta<typeof AchievementBadge>;

const Template: ComponentStory<typeof AchievementBadge> = (args) => (
  <AchievementBadge {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockAchievementBadgeProps.base,
} as IAchievementBadge;

export const Disabled = Template.bind({});

Disabled.args = {
  ...mockAchievementBadgeProps.disabled,
} as IAchievementBadge;

export const WithText = Template.bind({});

WithText.args = {
  ...mockAchievementBadgeProps.withText,
} as IAchievementBadge;

export const WithTextDisabled = Template.bind({});

WithTextDisabled.args = {
  ...mockAchievementBadgeProps.withTextDisabled,
} as IAchievementBadge;

export const Large = Template.bind({});

Large.args = {
  ...mockAchievementBadgeProps.base,
  size: "large",
} as IAchievementBadge;
