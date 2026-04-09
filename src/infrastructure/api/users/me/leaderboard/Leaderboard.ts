import { Id } from "domain/models/types/core";

import type { AvatarModel } from "infrastructure/api/generated/models";

export type LeaderboardLeague =
  | "iron"
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "emerald"
  | "ruby"
  | "sapphire"
  | "diamond"
  | "mythic";

export interface LeaderboardEntry {
  id: Id;
  rank: number;
  name: string;
  avatar: AvatarModel;
  xp: number;
}

export interface LeaderboardZones {
  promotionZoneEndIndex: number;
  demotionZoneStartIndex: number;
}

export interface UserLeaderboard {
  currentLeague: LeaderboardLeague;
  /** ISO 8601 duration string, e.g. PT6H30M */
  timeLeft: string;
  zones: LeaderboardZones;
  users: LeaderboardEntry[];
  hasStartedWeek: boolean;
}
