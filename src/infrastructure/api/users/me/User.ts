import type { Id } from "domain/models/types/core";
import { Subscription } from "./subscriptions/Subscriptions";

export interface UserPrivate {
  id: Id;
  username: string;
  role: UserRole;
  streak: number;
  balance: number;
  energy: number;
  equippedStreakFreezes: number;
  accountInitialized: boolean;
  activeSubscription: Subscription | null;
}

export type UserRole = "USER" | "PREMIUM_USER";

