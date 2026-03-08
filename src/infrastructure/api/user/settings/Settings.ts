import type { AvatarDefinition } from "components/avatar/Avatar";

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

export interface Settings {
  username: string;
  name: string;
  email: string;
  dailyGoal: DailyGoal;
  coursePreferences?: CoursePreferences;
  avatarDefinition?: AvatarDefinition;
  themeMode: ThemeMode;
  notificationPreferences: NotificationPreferences;
}

export type DailyGoal = number;
