import type { LeaderboardUser } from "./Leaderboard";
import { defaultAvatar } from "components/avatar/Avatar.mocks";

export const mockLeaderboardUsers: LeaderboardUser[] = [
  {
    id: 1,
    rank: 1,
    name: "Alex Johnson",
    avatar: defaultAvatar,
    xp: 1250,
  },
  {
    id: 2,
    rank: 2,
    name: "Sam Williams",
    avatar: defaultAvatar,
    xp: 980,
  },
  {
    id: 3,
    rank: 3,
    name: "Jordan Lee",
    avatar: defaultAvatar,
    xp: 720,
  },
  {
    id: 4,
    rank: 4,
    name: "Casey Brown",
    avatar: defaultAvatar,
    xp: 450,
  },
  {
    id: 5,
    rank: 5,
    name: "Morgan Taylor",
    avatar: defaultAvatar,
    xp: 200,
  },
];
