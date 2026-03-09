import { ComponentMeta, ComponentStory } from "@storybook/react";

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
    id: "notice-1",
    type: "LEAGUE_DEMOTED",
    league: "emerald",
  },
} as LeagueDemotedNoticeProps;
