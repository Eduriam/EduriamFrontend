import { Achievement } from "infrastructure/api/user/achievements/Achievements";
import type { AvatarDefinition } from "components/avatar/Avatar";

export interface UserProfile {
  id: Id;
  followers: number;
  following: number;
  level: number;
  name: string;
  profileImageUrl: string;
  avatarDefinition?: AvatarDefinition;
  isFollowed: boolean;
  username: string;
  learningStats: Array<LearningDataPoint>;
  streak: number;
  achievements: Array<ProfileAchievement>;
}

export type UserSummary = Pick<
  UserProfile,
  "id" | "name" | "username" | "profileImageUrl" | "isFollowed"
>;

export type ProfileAchievement = Pick<
  Achievement,
  "id" | "title" | "description" | "imageUrl" | "progress"
>;

export interface LearningDataPoint {
  date: string;
  points: number;
}
