import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { buildShopAvatar } from "app/shop/utils/avatar";
import {
  AvatarEyeColor,
  AvatarEyes,
  AvatarHair,
  AvatarHairColor,
} from "infrastructure/api/generated/models";

import AvatarCategoryGrid, {
  type IAvatarCategoryGrid,
} from "./AvatarCategoryGrid";

export default {
  title: "avatar/AvatarCategoryGrid",
  component: AvatarCategoryGrid,
} as ComponentMeta<typeof AvatarCategoryGrid>;

const Template: ComponentStory<typeof AvatarCategoryGrid> = (args) => (
  <AvatarCategoryGrid {...args} />
);

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      id: "hair",
      labelKey: "avatar.categories.hair",
      avatar: buildShopAvatar({
        hair: AvatarHair.Hair1,
        hairColor: AvatarHairColor.DarkBrown,
      }),
    },
    {
      id: "eyes",
      labelKey: "avatar.categories.eyes",
      avatar: buildShopAvatar({
        eyes: AvatarEyes.Eyes2,
        eyeColor: AvatarEyeColor.Blue,
      }),
    },
  ],
} as IAvatarCategoryGrid;
