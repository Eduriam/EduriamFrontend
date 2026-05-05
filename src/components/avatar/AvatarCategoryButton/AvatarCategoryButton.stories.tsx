import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { buildShopAvatar } from "app/shop/utils/avatar";
import { AvatarHair, AvatarHairColor } from "infrastructure/api/generated/models";

import AvatarCategoryButton, {
  type IAvatarCategoryButton,
} from "./AvatarCategoryButton";

export default {
  title: "avatar/AvatarCategoryButton",
  component: AvatarCategoryButton,
} as ComponentMeta<typeof AvatarCategoryButton>;

const Template: ComponentStory<typeof AvatarCategoryButton> = (args) => (
  <AvatarCategoryButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  avatar: buildShopAvatar({
    hair: AvatarHair.Hair1,
    hairColor: AvatarHairColor.DarkBrown,
  }),
} as IAvatarCategoryButton;
