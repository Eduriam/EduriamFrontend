export interface ShopCategoryConfig {
  id: string;
  nameKey: string;
}

export const shopCategories: ShopCategoryConfig[] = [
  {
    id: "hair",
    nameKey: "shop.categories.hair",
  },
];

export const DEFAULT_SHOP_CATEGORY_ID = shopCategories[0].id;
