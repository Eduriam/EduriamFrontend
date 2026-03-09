import { ComponentMeta, ComponentStory } from "@storybook/react";

import StreakSavedNotice, {
  type StreakSavedNoticeProps,
} from "./StreakSavedNotice";

export default {
  title: "notices/StreakSavedNotice",
  component: StreakSavedNotice,
} as ComponentMeta<typeof StreakSavedNotice>;

const Template: ComponentStory<typeof StreakSavedNotice> = (args) => (
  <StreakSavedNotice {...args} />
);

export const Base = Template.bind({});

Base.args = {
  notice: {
    id: "notice-1",
    type: "STREAK_SAVED",
    streakDays: 121,
    freezesLeft: 1,
  },
} as StreakSavedNoticeProps;
