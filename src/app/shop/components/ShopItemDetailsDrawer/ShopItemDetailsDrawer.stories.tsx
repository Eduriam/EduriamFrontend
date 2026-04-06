import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AvatarHair } from "infrastructure/api/generated/models";

import ShopItemDetailsDrawer, {
  type IShopItemDetailsDrawer,
} from "./ShopItemDetailsDrawer";

const item = {
  id: 2,
  name: "Hair 2",
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
  title: "shop/ShopItemDetailsDrawer",
  component: ShopItemDetailsDrawer,
} as ComponentMeta<typeof ShopItemDetailsDrawer>;

const Template: ComponentStory<typeof ShopItemDetailsDrawer> = (args) => (
  <ShopItemDetailsDrawer {...args} />
);

export const BuyEnabled = Template.bind({});
BuyEnabled.args = {
  open: true,
  onClose: () => undefined,
  item,
  canBuy: true,
  locked: false,
  onBuy: () => undefined,
} as IShopItemDetailsDrawer;

export const NotEnoughCoins = Template.bind({});
NotEnoughCoins.args = {
  open: true,
  onClose: () => undefined,
  item,
  canBuy: false,
  locked: false,
  onBuy: () => undefined,
} as IShopItemDetailsDrawer;

export const Locked = Template.bind({});
Locked.args = {
  open: true,
  onClose: () => undefined,
  item,
  canBuy: false,
  locked: true,
  unlockCondition: "Obtain the achievement to unlock this item.",
  onBuy: () => undefined,
} as IShopItemDetailsDrawer;
