import { ComponentMeta, ComponentStory } from "@storybook/react";

import NotificationsDisabledNotice, {
  type NotificationsDisabledNoticeProps,
} from "./NotificationsDisabledNotice";

export default {
  title: "notices/NotificationsDisabledNotice",
  component: NotificationsDisabledNotice,
} as ComponentMeta<typeof NotificationsDisabledNotice>;

const Template: ComponentStory<typeof NotificationsDisabledNotice> = (args) => (
  <NotificationsDisabledNotice {...args} />
);

export const Base = Template.bind({});

Base.args = {
  notice: {
    id: 1,
  },
} as NotificationsDisabledNoticeProps;

