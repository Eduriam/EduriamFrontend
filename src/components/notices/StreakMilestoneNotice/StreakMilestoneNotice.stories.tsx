import { ComponentMeta, ComponentStory } from "@storybook/react";

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
    type: "STREAK_MILESTONE",
    streakDays: 100,
  },
} as StreakMilestoneNoticeProps;

