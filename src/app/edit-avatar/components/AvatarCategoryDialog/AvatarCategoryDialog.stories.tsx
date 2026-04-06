import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { buildShopAvatar } from "app/shop/utils/avatar";

import {
  AvatarHair,
  AvatarHairColor,
} from "infrastructure/api/generated/models";

import AvatarCategoryDialog, {
  type IAvatarCategoryDialog,
} from "./AvatarCategoryDialog";

export default {
  title: "pages/edit-avatar/AvatarCategoryDialog",
  component: AvatarCategoryDialog,
} as ComponentMeta<typeof AvatarCategoryDialog>;

const Template: ComponentStory<typeof AvatarCategoryDialog> = (args) => (
  <AvatarCategoryDialog {...args} />
);

export const Open = Template.bind({});
Open.args = {
  open: true,
  onClose: () => undefined,
  onBack: () => undefined,
  category: {
    id: "hair",
    labelKey: "avatarEditor.fields.hair",
    itemField: "hair",
    colorField: "hairColor",
    itemValues: [AvatarHair.Hair1, AvatarHair.Hair2],
    colorValues: [AvatarHairColor.DarkBrown, AvatarHairColor.Blond],
  },
  draftAvatar: buildShopAvatar({
    hair: AvatarHair.Hair1,
    hairColor: AvatarHairColor.DarkBrown,
  }),
  onSelectOption: () => undefined,
} as IAvatarCategoryDialog;
