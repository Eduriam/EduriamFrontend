import type { ComponentMeta, ComponentStory } from "@storybook/react";

import LeagueIcon, {
  type LeagueIconProps,
  type LeagueIconSize,
  type LeagueIconVariant,
} from "./LeagueIcon";
import { mockLeagueIconProps } from "./LeagueIcon.mocks";

export default {
  title: "leaderboard/LeagueIcon",
  component: LeagueIcon,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: [
          "Empty",
          "Locked",
          "Iron",
          "Bronze",
          "Silver",
          "Gold",
          "Platinum",
          "Emerald",
          "Ruby",
          "Sapphire",
          "Diamond",
          "Mythic",
        ] satisfies LeagueIconVariant[],
      },
    },
    size: {
      control: {
        type: "inline-radio",
        options: ["small", "medium", "large"] satisfies LeagueIconSize[],
      },
    },
  },
} as ComponentMeta<typeof LeagueIcon>;

const Template: ComponentStory<typeof LeagueIcon> = (args) => (
  <LeagueIcon {...args} />
);

export const Default: ComponentStory<typeof LeagueIcon> = Template.bind({});
Default.args = {
  ...mockLeagueIconProps.base,
} as LeagueIconProps;
