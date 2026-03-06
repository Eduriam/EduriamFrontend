import { ComponentMeta, ComponentStory } from "@storybook/react";

import ShopNavbar, { type ShopNavbarProps } from "./ShopNavbar";

export default {
  title: "shop/ShopNavbar",
  component: ShopNavbar,
} as ComponentMeta<typeof ShopNavbar>;

const Template: ComponentStory<typeof ShopNavbar> = (args) => (
  <ShopNavbar {...args} />
);

export const WithClose = Template.bind({});
WithClose.args = {
  leftButton: {
    icon: "close",
    onClick: () => undefined,
  },
  balance: 407,
} as ShopNavbarProps;

export const WithBack = Template.bind({});
WithBack.args = {
  leftButton: {
    icon: "chevronLeft",
    onClick: () => undefined,
  },
  balance: 407,
} as ShopNavbarProps;
