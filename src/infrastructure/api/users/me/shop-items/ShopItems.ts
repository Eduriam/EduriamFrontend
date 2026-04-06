import { Id } from "domain/models/types/core";

import type { AvatarModel } from "infrastructure/api/generated/models";

export type ShopItemImage =
  | {
      type: "illustration";
      illustration: string;
    }
  | {
      type: "avatar";
      avatar: Partial<AvatarModel>;
    };

export interface ShopItemAchievementLock {
  achievementId: string;
}

export interface ShopItem {
  id: Id;
  name: string;
  price: number;
  categoryId: string;
  bought: boolean;
  image: ShopItemImage;
  achievementLock?: ShopItemAchievementLock;
}
