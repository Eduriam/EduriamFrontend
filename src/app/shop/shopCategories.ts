export interface ShopCategoryConfig {
  id: string;
  nameKey: string;
}

export const shopCategories: ShopCategoryConfig[] = [
  {
    id: "hair",
    nameKey: "shop.categories.hair",
  },
  {
    id: "eyes",
    nameKey: "shop.categories.eyes",
  },
  {
    id: "expression",
    nameKey: "shop.categories.expression",
  },
  {
    id: "beard",
    nameKey: "shop.categories.beard",
  },
  {
    id: "accessories",
    nameKey: "shop.categories.accessories",
  },
  {
    id: "headwear",
    nameKey: "shop.categories.headwear",
  },
  {
    id: "clothing",
    nameKey: "shop.categories.clothing",
  },
];

export const DEFAULT_SHOP_CATEGORY_ID = shopCategories[0].id;
