import { ComponentMeta, ComponentStory } from "@storybook/react";

import { NoticeType } from "infrastructure/api/generated/models";

import AchievementEarnedNotice, {
  type AchievementEarnedNoticeProps,
} from "./AchievementEarnedNotice";

export default {
  title: "notices/AchievementEarnedNotice",
  component: AchievementEarnedNotice,
} as ComponentMeta<typeof AchievementEarnedNotice>;

const Template: ComponentStory<typeof AchievementEarnedNotice> = (args) => (
  <AchievementEarnedNotice {...args} />
);

export const Base = Template.bind({});

Base.args = {
  notice: {
    id: 1,
    type: NoticeType.ACHIEVEMENT_EARNED,
    achievementId: 1001,
    title: "Great Student",
    description: "You completed 100 lessons.",
    badgeIconName: "achievement-1",
  },
} as AchievementEarnedNoticeProps;
