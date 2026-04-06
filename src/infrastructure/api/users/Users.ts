import type { Id } from "domain/models/types/core";
import type { AvatarModel } from "infrastructure/api/generated/models";

import { LeaderboardLeague } from "./me/leaderboard/Leaderboard";

export interface UserProfile {
  id: Id;
  followers: number;
  following: number;
  level: number;
  league: LeaderboardLeague;
  name: string;
  avatarDefinition?: AvatarModel;
  isFollowed: boolean;
  username: string;
  streak: number;
  achievements: Array<ProfileAchievement>;
  courses: Array<ProfileCourse>;
}

export type UserSummary = Pick<
  UserProfile,
  "id" | "name" | "username" | "avatarDefinition" | "isFollowed"
>;

export type ProfileAchievement = {
  badgeIconName: "achievement-1" | "achievement-2";
  userProgress: {
    value: number;
    goal: number;
  };
  description?: string;
  id: Id;
  title: string;
};

export interface ProfileCourse {
  id: Id;
  name: string;
  type: "course" | "learning-path";
  logoId?: string;
  userProgress?: number;
}

