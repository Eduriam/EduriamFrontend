import type { ComponentMeta, ComponentStory } from "@storybook/react";

import Leaderboard, { type ILeaderboard } from "./Leaderboard";
import { mockLeaderboardUsers } from "./Leaderboard.mocks";

export default {
  title: "pages/leaderboard/Leaderboard",
  component: Leaderboard,
} as ComponentMeta<typeof Leaderboard>;

const Template: ComponentStory<typeof Leaderboard> = (args) => (
  <Leaderboard {...args} />
);

export const League = Template.bind({});
League.args = {
  users: mockLeaderboardUsers,
  promotionEndIndex: 2,
  neutralEndIndex: 4,
  promotionLabel: "Promotion zone",
  neutralLabel: "Neutral",
  demotionLabel: "Demotion zone",
} as ILeaderboard;
