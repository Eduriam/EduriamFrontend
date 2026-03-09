import { AvatarDefinition } from "components/avatar/Avatar";

import { LeaderboardLeague } from "../leaderboard/Leaderboard";

import { Reaction } from "./reactions/Reactions";

export type FeedItem = FeedMessage;

interface FeedMessageBase {
  id: Id;
  seenByUser?: boolean;
  author: string;
  avatarDefinition: AvatarDefinition;
  reactions: Array<Reaction>;
  publishedAt: Date;
}

type StreakMilestoneFeedMessage = FeedMessageBase & {
  message: "streak_milestone";
  streak: number;
};

type AchievementEarnedFeedMessage = FeedMessageBase & {
  message: "achievement_earned";
  achievementId: Id;
};

type LeaguePromotedFeedMessage = FeedMessageBase & {
  message: "league_promoted";
  league: LeaderboardLeague;
};

type CourseCompletedFeedMessage = FeedMessageBase & {
  message: "course_completed";
  courseName: string;
};

export type FeedMessage =
  | StreakMilestoneFeedMessage
  | AchievementEarnedFeedMessage
  | LeaguePromotedFeedMessage
  | CourseCompletedFeedMessage;

export type MessageType =
  | "streak_milestone"
  | "achievement_earned"
  | "league_promoted"
  | "course_completed";
