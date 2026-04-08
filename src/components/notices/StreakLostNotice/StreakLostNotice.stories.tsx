import { ComponentMeta, ComponentStory } from "@storybook/react";

import { NoticeType } from "infrastructure/api/generated/models";

import StreakLostNotice, { type StreakLostNoticeProps } from "./StreakLostNotice";

export default {
  title: "notices/StreakLostNotice",
  component: StreakLostNotice,
} as ComponentMeta<typeof StreakLostNotice>;

const Template: ComponentStory<typeof StreakLostNotice> = (args) => (
  <StreakLostNotice {...args} />
);

export const Base = Template.bind({});

Base.args = {
  notice: {
    id: 1,
    type: NoticeType.STREAK_LOST,
    previousStreakDays: 47,
  },
} as StreakLostNoticeProps;

