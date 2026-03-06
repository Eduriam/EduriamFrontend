import { ComponentMeta, ComponentStory } from "@storybook/react";

import ShopCategory, { type IShopCategory } from "./ShopCategory";

export default {
  title: "shop/ShopCategory",
  component: ShopCategory,
} as ComponentMeta<typeof ShopCategory>;

const Template: ComponentStory<typeof ShopCategory> = (args) => (
  <ShopCategory {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onClick: () => undefined,
} as IShopCategory;
