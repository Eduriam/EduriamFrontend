import type { ILeaderboardListItem } from "./LeaderboardListItem";
import { defaultAvatar } from "components/avatar/Avatar.mocks";

export const mockLeaderboardListItemProps: ILeaderboardListItem = {
  rank: 1,
  name: "Alex Johnson",
  avatar: defaultAvatar,
  xp: 1250,
};

export const mockLeaderboardListItems: ILeaderboardListItem[] = [
  { ...mockLeaderboardListItemProps, rank: 1, name: "Alex Johnson", xp: 1250 },
  {
    rank: 2,
    name: "Sam Williams",
    avatar: defaultAvatar,
    xp: 980,
  },
  {
    rank: 3,
    name: "Jordan Lee",
    avatar: defaultAvatar,
    xp: 720,
  },
];
