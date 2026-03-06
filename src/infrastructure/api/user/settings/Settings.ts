import type { AvatarDefinition } from "components/avatar/Avatar";

export interface CoursePreferences {
  codingExperience?: string;
  areaOfInterest?: string;
  userGoal?: string;
}

export interface Settings {
  username: string;
  name: string;
  email: string;
  dailyGoal: DailyGoal;
  coursePreferences?: CoursePreferences;
  avatarDefinition?: AvatarDefinition;
}

export type DailyGoal = number;
