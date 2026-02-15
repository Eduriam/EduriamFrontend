import type { LeaderboardUser } from "./Leaderboard";
import { defaultAvatar } from "components/avatar/Avatar.mocks";

export const mockLeaderboardUsers: LeaderboardUser[] = [
  { rank: 1, name: "Alex Johnson", avatarDefinition: defaultAvatar, xp: 1250 },
  { rank: 2, name: "Sam Williams", avatarDefinition: defaultAvatar, xp: 980 },
  { rank: 3, name: "Jordan Lee", avatarDefinition: defaultAvatar, xp: 720 },
  { rank: 4, name: "Casey Brown", avatarDefinition: defaultAvatar, xp: 450 },
  { rank: 5, name: "Morgan Taylor", avatarDefinition: defaultAvatar, xp: 200 },
];
