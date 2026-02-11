import { ComponentMeta, ComponentStory } from "@storybook/react";

import StreakDrawer, { type IStreakDrawerProps } from "./StreakDrawer";

export default {
  title: "pages/(home)/StreakDrawer",
  component: StreakDrawer,
  argTypes: {},
} as ComponentMeta<typeof StreakDrawer>;

const Template: ComponentStory<typeof StreakDrawer> = (args) => (
  <StreakDrawer {...args} />
);

export const Base = Template.bind({});

Base.args = {
  open: true,
  streakDays: 1247,
  equippedStreakFreezes: 2,
  maxStreakFreezes: 2,
} as IStreakDrawerProps;

export const EmptyState = Template.bind({});

EmptyState.args = {
  open: true,
  streakDays: 0,
  equippedStreakFreezes: 0,
  maxStreakFreezes: 2,
} as IStreakDrawerProps;
