import { ComponentMeta, ComponentStory } from "@storybook/react";

import { NoticeType } from "infrastructure/api/generated/models";

import FreeTrialEndNotice, {
  type FreeTrialEndNoticeProps,
} from "./FreeTrialEndNotice";

export default {
  title: "notices/FreeTrialEndNotice",
  component: FreeTrialEndNotice,
} as ComponentMeta<typeof FreeTrialEndNotice>;

const Template: ComponentStory<typeof FreeTrialEndNotice> = (args) => (
  <FreeTrialEndNotice {...args} />
);

export const Base = Template.bind({});

Base.args = {
  notice: {
    id: 1,
    type: NoticeType.FREE_TRIAL_END,
    daysLeft: 3,
  },
} as FreeTrialEndNoticeProps;

