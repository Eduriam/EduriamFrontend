import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LeagueType, NoticeType } from "infrastructure/api/generated/models";

import LeagueDemotedNotice, {
  type LeagueDemotedNoticeProps,
} from "./LeagueDemotedNotice";

export default {
  title: "notices/LeagueDemotedNotice",
  component: LeagueDemotedNotice,
} as ComponentMeta<typeof LeagueDemotedNotice>;

const Template: ComponentStory<typeof LeagueDemotedNotice> = (args) => (
  <LeagueDemotedNotice {...args} />
);

export const Base = Template.bind({});

Base.args = {
  notice: {
    id: 1,
    type: NoticeType.LEAGUE_DEMOTED,
    league: LeagueType.Silver,
  },
} as LeagueDemotedNoticeProps;

