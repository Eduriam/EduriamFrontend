import { ComponentMeta, ComponentStory } from "@storybook/react";

import LeagueCard, { type ILeagueCard } from "./LeagueCard";
import { mockLeagueCardProps } from "./LeagueCard.mocks";

export default {
  title: "pages/users/[userId]/LeagueCard",
  component: LeagueCard,
  argTypes: {},
} as ComponentMeta<typeof LeagueCard>;

const Template: ComponentStory<typeof LeagueCard> = (args) => (
  <LeagueCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockLeagueCardProps,
} as ILeagueCard;
