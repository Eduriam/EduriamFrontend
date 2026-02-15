import type { ComponentMeta, ComponentStory } from "@storybook/react";

import LeaderboardZoneDivider, {
  type ILeaderboardZoneDivider,
  type LeaderboardZoneVariant,
} from "./LeaderboardZoneDivider";

export default {
  title: "pages/leaderboard/LeaderboardZoneDivider",
  component: LeaderboardZoneDivider,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: [
          "promotion",
          "neutral",
          "demotion",
        ] satisfies LeaderboardZoneVariant[],
      },
    },
  },
} as ComponentMeta<typeof LeaderboardZoneDivider>;

const Template: ComponentStory<typeof LeaderboardZoneDivider> = (args) => (
  <LeaderboardZoneDivider {...args} />
);

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: "Promotion zone",
  variant: "promotion",
} as ILeaderboardZoneDivider;

export const Neutral = Template.bind({});
Neutral.args = {
  label: "Neutral",
  variant: "neutral",
} as ILeaderboardZoneDivider;

export const Demotion = Template.bind({});
Demotion.args = {
  label: "Demotion zone",
  variant: "demotion",
} as ILeaderboardZoneDivider;
