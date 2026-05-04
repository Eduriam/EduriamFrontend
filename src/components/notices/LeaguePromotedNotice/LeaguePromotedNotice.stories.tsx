import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LeagueType, NoticeType } from "infrastructure/api/generated/models";

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
    type: NoticeType.LeaguePromoted,
    league: LeagueType.Diamond,
  },
} as LeaguePromotedNoticeProps;

