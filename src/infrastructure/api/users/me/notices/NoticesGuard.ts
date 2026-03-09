import type {
  AchievementEarnedNotice,
  AdvertisementNotice,
  ChestRewardNotice,
  LeagueDemotedNotice,
  LeaguePromotedNotice,
  Notice,
  NotificationsDisabledNotice,
  StreakLostNotice,
  StreakMilestoneNotice,
  StreakSavedNotice,
} from "./Notices";

export function isNotificationsDisabledNotice(
  notice: Notice,
): notice is NotificationsDisabledNotice {
  return notice.type === "NOTIFICATIONS_DISABLED";
}

export function isStreakMilestoneNotice(
  notice: Notice,
): notice is StreakMilestoneNotice {
  return notice.type === "STREAK_MILESTONE";
}

export function isStreakLostNotice(notice: Notice): notice is StreakLostNotice {
  return notice.type === "STREAK_LOST";
}

export function isStreakSavedNotice(
  notice: Notice,
): notice is StreakSavedNotice {
  return notice.type === "STREAK_SAVED";
}

export function isLeaguePromotedNotice(
  notice: Notice,
): notice is LeaguePromotedNotice {
  return notice.type === "LEAGUE_PROMOTED";
}

export function isLeagueDemotedNotice(
  notice: Notice,
): notice is LeagueDemotedNotice {
  return notice.type === "LEAGUE_DEMOTED";
}

export function isAchievementEarnedNotice(
  notice: Notice,
): notice is AchievementEarnedNotice {
  return notice.type === "ACHIEVEMENT_EARNED";
}

export function isChestRewardNotice(notice: Notice): notice is ChestRewardNotice {
  return notice.type === "CHEST_REWARD";
}

export function isAdvertisementNotice(
  notice: Notice,
): notice is AdvertisementNotice {
  return notice.type === "ADVERTISEMENT";
}
