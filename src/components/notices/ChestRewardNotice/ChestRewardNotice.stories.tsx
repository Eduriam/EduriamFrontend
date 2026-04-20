import { ComponentMeta, ComponentStory } from "@storybook/react";

import { NoticeType } from "infrastructure/api/generated/models";

import ChestRewardNotice, { type ChestRewardNoticeProps } from "./ChestRewardNotice";

export default {
  title: "notices/ChestRewardNotice",
  component: ChestRewardNotice,
} as ComponentMeta<typeof ChestRewardNotice>;

const Template: ComponentStory<typeof ChestRewardNotice> = (args) => (
  <ChestRewardNotice {...args} />
);

export const Base = Template.bind({});

Base.args = {
  notice: {
    id: 1,
    type: NoticeType.CHEST_REWARD,
    userChestId: 1,
    lessonId: 1001,
    chestId: 1,
    chestName: "Bronze Chest",
    reward: 10,
  },
} as ChestRewardNoticeProps;


