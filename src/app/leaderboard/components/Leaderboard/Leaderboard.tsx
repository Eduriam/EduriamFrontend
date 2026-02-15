"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import type { AvatarDefinition } from "components/avatar/Avatar";

import LeaderboardListItem from "../LeaderboardListItem/LeaderboardListItem";
import LeaderboardZoneDivider, {
  type LeaderboardZoneVariant,
} from "../LeaderboardZoneDivider/LeaderboardZoneDivider";

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatarDefinition: AvatarDefinition;
  xp: number;
}

export interface ILeaderboard {
  /** Ordered list of users (1-based rank) */
  users: LeaderboardUser[];
  /** Exclusive end index for promotion zone (users 0..promotionEndIndex-1) */
  promotionEndIndex: number;
  /** Exclusive end index for neutral zone (users promotionEndIndex..neutralEndIndex-1) */
  neutralEndIndex: number;
  /** Optional labels for each zone divider */
  promotionLabel: string;
  neutralLabel: string;
  demotionLabel: string;
}

const Leaderboard: React.FC<ILeaderboard> = ({
  users,
  promotionEndIndex,
  neutralEndIndex,
  promotionLabel,
  neutralLabel,
  demotionLabel,
}) => {
  const promotionUsers = users.slice(0, promotionEndIndex);
  const neutralUsers = users.slice(promotionEndIndex, neutralEndIndex);
  const demotionUsers = users.slice(neutralEndIndex);

  const renderZone = (
    zoneUsers: LeaderboardUser[],
    dividerLabel: string,
    dividerVariant: LeaderboardZoneVariant,
  ) => {
    if (zoneUsers.length === 0) {
      return null;
    }
    return (
      <Box key={dividerVariant}>
        <LeaderboardZoneDivider label={dividerLabel} variant={dividerVariant} />
        <Stack component="ul" sx={{ listStyle: "none", padding: 0, margin: 0 }}>
          {zoneUsers.map((user) => (
            <Box component="li" key={user.rank}>
              <LeaderboardListItem
                rank={user.rank}
                name={user.name}
                avatarDefinition={user.avatarDefinition}
                xp={user.xp}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    );
  };

  return (
    <Box component="section" sx={{ width: "100%" }}>
      {promotionUsers.length > 0 && (
        <>{renderZone(promotionUsers, promotionLabel, "promotion")}</>
      )}
      {neutralUsers.length > 0 && (
        <>{renderZone(neutralUsers, neutralLabel, "neutral")}</>
      )}
      {demotionUsers.length > 0 && (
        <>{renderZone(demotionUsers, demotionLabel, "demotion")}</>
      )}
    </Box>
  );
};

export default Leaderboard;
