import { ComponentMeta, ComponentStory } from "@storybook/react";

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
    id: "notice-1",
    type: "ACHIEVEMENT_EARNED",
    title: "Skvělý student",
    description: "Dokončil jsi 100 lekcí.",
  },
} as AchievementEarnedNoticeProps;
