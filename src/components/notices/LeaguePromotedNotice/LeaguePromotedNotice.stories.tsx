import { ComponentMeta, ComponentStory } from "@storybook/react";

import LeaguePromotedNotice, {
  type LeaguePromotedNoticeProps,
} from "./LeaguePromotedNotice";

export default {
  title: "notices/LeaguePromotedNotice",
  component: LeaguePromotedNotice,
} as ComponentMeta<typeof LeaguePromotedNotice>;

const Template: ComponentStory<typeof LeaguePromotedNotice> = (args) => (
  <LeaguePromotedNotice {...args} />
);

export const Base = Template.bind({});

Base.args = {
  notice: {
    id: 1,
    type: "LEAGUE_PROMOTED",
    league: "diamond",
  },
} as LeaguePromotedNoticeProps;

