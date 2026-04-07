import { ComponentMeta, ComponentStory } from "@storybook/react";

import {
  AvatarHair,
  ShopIllustrationKind,
  ShopImageKind,
} from "infrastructure/api/generated/models";

import ShopItem, { type IShopItem } from "./ShopItem";

const baseItem = {
  id: 1,
  name: "Hair 1",
  price: 900,
  isLocked: false,
  remainingCount: 1,
  image: {
    id: "hair-1",
    kind: ShopImageKind.Avatar,
    avatar: {
      hair: AvatarHair.Hair2,
    },
    illustration: null,
  } as const,
};

export default {
  title: "shop/ShopItem",
  component: ShopItem,
} as ComponentMeta<typeof ShopItem>;

const Template: ComponentStory<typeof ShopItem> = (args) => (
  <ShopItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  item: baseItem,
  purchased: false,
  onClick: () => undefined,
} as IShopItem;

export const Bought = Template.bind({});
Bought.args = {
  item: baseItem,
  purchased: true,
} as IShopItem;

export const Locked = Template.bind({});
Locked.args = {
  item: {
    ...baseItem,
    type: ShopItemType.StreakFreeze,
    image: {
      id: "streak-freeze-1",
      kind: ShopImageKind.Illustration,
      avatar: null,
      illustration: {
        kind: ShopIllustrationKind.StreakFreeze,
      },
    },
  },
  locked: true,
} as IShopItem;
