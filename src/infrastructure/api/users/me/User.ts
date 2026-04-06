import type { Id } from "domain/models/types/core";

import type { SubscriptionModel } from "infrastructure/api/generated/models";

export interface UserPrivate {
  id: Id;
  username: string;
  role: UserRole;
  streak: number;
  balance: number;
  energy: number;
  streakFreezes: number;
  accountInitialized: boolean;
  activeSubscription: SubscriptionModel | null | undefined;
}

export type UserRole = "USER" | "PREMIUM_USER" | "CORRECTOR";
