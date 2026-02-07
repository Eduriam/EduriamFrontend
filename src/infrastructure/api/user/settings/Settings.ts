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
}

export type DailyGoal = number;
