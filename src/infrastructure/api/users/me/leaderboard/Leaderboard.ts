import { AvatarDefinition } from "components/avatar/Avatar";

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
  id: string;
  rank: number;
  name: string;
  avatarDefinition: AvatarDefinition;
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
