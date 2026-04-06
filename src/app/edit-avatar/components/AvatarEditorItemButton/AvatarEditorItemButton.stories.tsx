import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { buildShopAvatar } from "app/shop/utils/avatar";
import {
  AvatarHair,
  AvatarHairColor,
} from "infrastructure/api/generated/models";

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
  preview: buildShopAvatar({
    hair: AvatarHair.Hair1,
    hairColor: AvatarHairColor.DarkBrown,
  }),
  selected: false,
} as IAvatarEditorItemButton;

export const Selected = Template.bind({});
Selected.args = {
  preview: buildShopAvatar({
    hair: AvatarHair.Hair2,
    hairColor: AvatarHairColor.MediumBrown,
  }),
  selected: true,
} as IAvatarEditorItemButton;
