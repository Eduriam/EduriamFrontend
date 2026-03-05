import type { LeaderboardUser } from "./Leaderboard";
import { defaultAvatar } from "components/avatar/Avatar.mocks";

export const mockLeaderboardUsers: LeaderboardUser[] = [
  {
    id: "user-1",
    rank: 1,
    name: "Alex Johnson",
    avatarDefinition: defaultAvatar,
    xp: 1250,
  },
  {
    id: "user-2",
    rank: 2,
    name: "Sam Williams",
    avatarDefinition: defaultAvatar,
    xp: 980,
  },
  {
    id: "user-3",
    rank: 3,
    name: "Jordan Lee",
    avatarDefinition: defaultAvatar,
    xp: 720,
  },
  {
    id: "user-4",
    rank: 4,
    name: "Casey Brown",
    avatarDefinition: defaultAvatar,
    xp: 450,
  },
  {
    id: "user-5",
    rank: 5,
    name: "Morgan Taylor",
    avatarDefinition: defaultAvatar,
    xp: 200,
  },
];
