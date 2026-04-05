import { ComponentMeta, ComponentStory } from "@storybook/react";

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
    type: "CHEST_REWARD",
    chestId: 1,
    reward: 10,
  },
} as ChestRewardNoticeProps;


