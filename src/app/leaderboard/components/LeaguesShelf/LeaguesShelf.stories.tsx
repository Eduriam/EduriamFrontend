import type { ComponentMeta, ComponentStory } from "@storybook/react";

import LeaguesShelf, { type ILeaguesShelf } from "./LeaguesShelf";

export default {
  title: "pages/leaderboard/LeaguesShelf",
  component: LeaguesShelf,
} as ComponentMeta<typeof LeaguesShelf>;

const Template: ComponentStory<typeof LeaguesShelf> = (args) => (
  <LeaguesShelf {...args} />
);

export const NoLeague = Template.bind({});
NoLeague.args = {
  currentLeague: null,
} as ILeaguesShelf;

export const FirstLeague = Template.bind({});
FirstLeague.args = {
  currentLeague: "iron",
} as ILeaguesShelf;

export const MiddleLeague = Template.bind({});
MiddleLeague.args = {
  currentLeague: "gold",
} as ILeaguesShelf;

export const LastLeague = Template.bind({});
LastLeague.args = {
  currentLeague: "mythic",
} as ILeaguesShelf;
