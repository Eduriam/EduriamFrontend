import type { AvatarDefinition } from "components/avatar/Avatar";

export type ShopItemImage =
  | {
      type: "illustration";
      illustration: string;
    }
  | {
      type: "avatar";
      avatar: Partial<AvatarDefinition>;
    };

export interface ShopItemAchievementLock {
  achievementId: string;
}

export interface ShopItem {
  id: Id;
  name: string;
  price: number;
  categoryId: Id;
  bought: boolean;
  image: ShopItemImage;
  achievementLock?: ShopItemAchievementLock;
}
