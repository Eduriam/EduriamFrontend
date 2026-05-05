import { ComponentMeta, ComponentStory } from "@storybook/react";

import NotificationNotice from "./NotificationNotice";

export default {
  title: "notices/NotificationNotice",
  component: NotificationNotice,
} as ComponentMeta<typeof NotificationNotice>;

const Template: ComponentStory<typeof NotificationNotice> = (args) => (
  <NotificationNotice {...args} />
);

export const Base = Template.bind({});

Base.args = {
  onDismiss: () => undefined,
  onEnabled: () => undefined,
};
