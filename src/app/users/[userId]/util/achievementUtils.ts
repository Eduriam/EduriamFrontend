import type {
  AchievementType,
  UserAchievementModel,
} from "infrastructure/api/generated/models";

export function toAchievementTitleKey(
  achievementType: AchievementType,
): string {
  return (
    ACHIEVEMENT_TYPE_TO_TITLE_KEY[achievementType] ??
    "achievements.achievements"
  );
}

export function toAchievementBadgeIconName(
  achievementType: AchievementType,
): "achievement-1" | "achievement-2" {
  return achievementType % 2 === 0 ? "achievement-1" : "achievement-2";
}

export function isAchievementCompleted(
  achievement: UserAchievementModel,
): boolean {
  return achievement.currentLevel >= toAchievementGoal(achievement);
}

const ACHIEVEMENT_TYPE_TO_TITLE_KEY: Record<AchievementType, string> = {
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

function toAchievementGoal(achievement: UserAchievementModel): number {
  return achievement.goal ?? Math.max(achievement.achievementMaxLevel, 1);
}
