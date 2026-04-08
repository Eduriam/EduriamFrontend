import { ComponentMeta, ComponentStory } from "@storybook/react";

import { NoticeType } from "infrastructure/api/generated/models";

import FreeTrialNotice, { type FreeTrialNoticeProps } from "./FreeTrialNotice";

export default {
  title: "notices/FreeTrialNotice",
  component: FreeTrialNotice,
} as ComponentMeta<typeof FreeTrialNotice>;

const Template: ComponentStory<typeof FreeTrialNotice> = (args) => (
  <FreeTrialNotice {...args} />
);

export const Base = Template.bind({});

Base.args = {
  notice: {
    id: 1,
    type: NoticeType.FREE_TRIAL,
  },
} as FreeTrialNoticeProps;

