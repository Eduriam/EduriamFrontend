import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AvatarHair } from "infrastructure/api/generated/models";

import ShopItem, { type IShopItem } from "./ShopItem";

const baseItem = {
  id: 1,
  name: "Hair 1",
  price: 900,
  categoryId: "hair",
  bought: false,
  image: {
    type: "avatar",
    avatar: {
      hair: AvatarHair.Hair2,
    },
  } as const,
};

export default {
  title: "shop/ShopItem",
  component: ShopItem,
} as ComponentMeta<typeof ShopItem>;

const Template: ComponentStory<typeof ShopItem> = (args) => <ShopItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  item: baseItem,
  onClick: () => undefined,
} as IShopItem;

export const Bought = Template.bind({});
Bought.args = {
  item: {
    ...baseItem,
    bought: true,
  },
} as IShopItem;

export const Locked = Template.bind({});
Locked.args = {
  item: {
    ...baseItem,
    image: {
      type: "illustration",
      illustration: "fire",
    },
  },
  locked: true,
} as IShopItem;
