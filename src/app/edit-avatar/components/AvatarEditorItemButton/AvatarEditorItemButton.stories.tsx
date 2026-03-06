import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { buildShopAvatar } from "app/shop/utils/avatar";

import AvatarEditorItemButton, {
  type IAvatarEditorItemButton,
} from "./AvatarEditorItemButton";

export default {
  title: "pages/edit-avatar/AvatarEditorItemButton",
  component: AvatarEditorItemButton,
} as ComponentMeta<typeof AvatarEditorItemButton>;

const Template: ComponentStory<typeof AvatarEditorItemButton> = (args) => (
  <AvatarEditorItemButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  preview: buildShopAvatar({ hair: "hair_1", hairColor: "darkBrown" }),
  selected: false,
} as IAvatarEditorItemButton;

export const Selected = Template.bind({});
Selected.args = {
  preview: buildShopAvatar({ hair: "hair_2", hairColor: "mediumBrown" }),
  selected: true,
} as IAvatarEditorItemButton;
