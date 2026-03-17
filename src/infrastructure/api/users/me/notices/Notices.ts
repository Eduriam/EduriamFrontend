import type { LeaderboardLeague } from "infrastructure/api/users/me/leaderboard/Leaderboard";

export interface BaseNotice {
  id: Id;
  createdAt?: string;
}

export interface NotificationsDisabledNotice extends BaseNotice {
  type: "NOTIFICATIONS_DISABLED";
}

export interface StreakMilestoneNotice extends BaseNotice {
  type: "STREAK_MILESTONE";
  streakDays: number;
}

export interface StreakLostNotice extends BaseNotice {
  type: "STREAK_LOST";
  previousStreakDays: number;
}

export interface StreakSavedNotice extends BaseNotice {
  type: "STREAK_SAVED";
  streakDays: number;
  freezesLeft: number;
}

export interface LeaguePromotedNotice extends BaseNotice {
  type: "LEAGUE_PROMOTED";
  league: LeaderboardLeague;
}

export interface LeagueDemotedNotice extends BaseNotice {
  type: "LEAGUE_DEMOTED";
  league: LeaderboardLeague;
}

export interface AchievementEarnedNotice extends BaseNotice {
  type: "ACHIEVEMENT_EARNED";
  title: string;
  description: string;
  badgeIconName: "achievement-1" | "achievement-2";
}

export interface ChestRewardNotice extends BaseNotice {
  type: "CHEST_REWARD";
  chestId: Id;
  reward: number;
}

export interface FreeTrialNotice extends BaseNotice {
  type: "FREE_TRIAL";
}

export interface FreeTrialEndNotice extends BaseNotice {
  type: "FREE_TRIAL_END";
  daysLeft?: number;
}

export type Notice =
  | NotificationsDisabledNotice
  | StreakMilestoneNotice
  | StreakLostNotice
  | StreakSavedNotice
  | LeaguePromotedNotice
  | LeagueDemotedNotice
  | AchievementEarnedNotice
  | ChestRewardNotice
  | FreeTrialNotice
  | FreeTrialEndNotice;

export type NoticeType = Notice["type"];
