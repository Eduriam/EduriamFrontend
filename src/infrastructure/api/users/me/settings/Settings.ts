import type { AvatarModel } from "infrastructure/api/generated/models";

export interface Settings {
  username: string;
  name: string;
  email: string;
  dailyGoal: DailyGoal;
  coursePreferences?: CoursePreferences;
  avatarDefinition?: AvatarModel;
  themeMode: ThemeMode;
  notificationPreferences: NotificationPreferences;
}

export interface CoursePreferences {
  codingExperience?: string;
  areaOfInterest?: string;
  userGoal?: string;
}

export type ThemeMode = "dark" | "light" | "system";

export interface NotificationPreferences {
  dailyPractice: boolean;
  streakFreezeUsed: boolean;
  leaderboardStatus: boolean;
  newFollower: boolean;
  friendActivity: boolean;
}

export type DailyGoal = number;
