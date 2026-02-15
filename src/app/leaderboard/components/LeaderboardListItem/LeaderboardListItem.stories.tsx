import type { ComponentMeta, ComponentStory } from "@storybook/react";

import LeaderboardListItem, {
  type ILeaderboardListItem,
} from "./LeaderboardListItem";
import {
  mockLeaderboardListItemProps,
  mockLeaderboardListItems,
} from "./LeaderboardListItem.mocks";

export default {
  title: "pages/leaderboard/LeaderboardListItem",
  component: LeaderboardListItem,
} as ComponentMeta<typeof LeaderboardListItem>;

const Template: ComponentStory<typeof LeaderboardListItem> = (args) => (
  <LeaderboardListItem {...args} />
);

export const Base = Template.bind({});
Base.args = {
  ...mockLeaderboardListItemProps,
} as ILeaderboardListItem;

export const WithLowXp = Template.bind({});
WithLowXp.args = {
  rank: 4,
  name: "Casey Brown",
  avatarDefinition: mockLeaderboardListItemProps.avatarDefinition,
  xp: 150,
} as ILeaderboardListItem;

export const Active = Template.bind({});
Active.args = {
  ...mockLeaderboardListItemProps,
  active: true,
} as ILeaderboardListItem;

export const List = () => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    {mockLeaderboardListItems.map((item) => (
      <LeaderboardListItem key={item.rank} {...item} />
    ))}
  </div>
);
