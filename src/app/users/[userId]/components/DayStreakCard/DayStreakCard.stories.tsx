import { ComponentMeta, ComponentStory } from "@storybook/react";

import DayStreakCard, { type IDayStreakCard } from "./DayStreakCard";
import { mockDayStreakCardProps } from "./DayStreakCard.mocks";

export default {
  title: "pages/users/[userId]/DayStreakCard",
  component: DayStreakCard,
  argTypes: {},
} as ComponentMeta<typeof DayStreakCard>;

const Template: ComponentStory<typeof DayStreakCard> = (args) => (
  <DayStreakCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockDayStreakCardProps,
} as IDayStreakCard;
