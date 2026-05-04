import { ComponentMeta, ComponentStory } from "@storybook/react";

import { NoticeType } from "infrastructure/api/generated/models";

import StreakMilestoneNotice, {
  type StreakMilestoneNoticeProps,
} from "./StreakMilestoneNotice";

export default {
  title: "notices/StreakMilestoneNotice",
  component: StreakMilestoneNotice,
} as ComponentMeta<typeof StreakMilestoneNotice>;

const Template: ComponentStory<typeof StreakMilestoneNotice> = (args) => (
  <StreakMilestoneNotice {...args} />
);

export const Base = Template.bind({});

Base.args = {
  notice: {
    id: 1,
    type: NoticeType.StreakMilestone,
    streakDays: 100,
  },
} as StreakMilestoneNoticeProps;

