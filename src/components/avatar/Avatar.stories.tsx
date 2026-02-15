import type { ComponentMeta, ComponentStory } from "@storybook/react";

import Avatar, { type AvatarProps } from "./Avatar";
import { defaultAvatar, fullAvatar, minimalAvatar } from "./Avatar.mocks";

export default {
  title: "avatar/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  definition: defaultAvatar,
  size: "large",
} as AvatarProps;

export const Minimal = Template.bind({});
Minimal.args = {
  definition: minimalAvatar,
  size: "large",
} as AvatarProps;

export const Full = Template.bind({});
Full.args = {
  definition: fullAvatar,
  size: "large",
} as AvatarProps;
