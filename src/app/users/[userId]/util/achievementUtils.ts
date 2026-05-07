import type {
  AchievementType,
  UserAchievementModel,
} from "infrastructure/api/generated/models";

export function toAchievementTitleKey(
  achievementType: AchievementType,
): string {
  return `${toAchievementLocalizationBaseKey(achievementType)}.title`;
}

export type AchievementDialogTextState =
  | "notAchieved"
  | "inProgress"
  | "completedAllLevels"
  | "otherUserNotAchieved"
  | "otherUserAchieved";

export function toAchievementDialogTextKey(
  achievementType: AchievementType,
  state: AchievementDialogTextState,
): string {
  return `${toAchievementLocalizationBaseKey(achievementType)}.${state}`;
}

export function toAchievementEarnedNoticeDescriptionKey(
  achievementType: AchievementType,
): string {
  return `${toAchievementLocalizationBaseKey(achievementType)}.earnedNoticeDescription`;
}

export function toAchievementBadgeIconName(
  achievementType: AchievementType,
): "achievement-1" | "achievement-2" {
  return achievementType % 2 === 0 ? "achievement-1" : "achievement-2";
}

export function isAchievementCompleted(
  achievement: UserAchievementModel,
): boolean {
  return achievement.currentLevel > 0;
}

export function isAchievementMaxLevelCompleted(
  achievement: UserAchievementModel,
): boolean {
  return achievement.currentLevel >= achievement.achievementMaxLevel;
}

const ACHIEVEMENT_TYPE_TO_LOCALIZATION_KEY: Record<AchievementType, string> = {
  0: "achievements.achievementsByType.lessonCompletions",
  1: "achievements.achievementsByType.reviewCompletions",
  2: "achievements.achievementsByType.courseCompletions",
  3: "achievements.achievementsByType.streakDays",
  4: "achievements.achievementsByType.perfectLessonCompletions",
  5: "achievements.achievementsByType.feedReactions",
  6: "achievements.achievementsByType.leagueTier",
  7: "achievements.achievementsByType.leagueFirstPlaceAny",
  8: "achievements.achievementsByType.leagueFirstPlaceMythic",
};

function toAchievementLocalizationBaseKey(
  achievementType: AchievementType,
): string {
  return (
    ACHIEVEMENT_TYPE_TO_LOCALIZATION_KEY[achievementType] ??
    "achievements.achievements"
  );
}
