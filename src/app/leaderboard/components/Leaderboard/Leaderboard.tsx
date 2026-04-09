"use client";

import { Id } from "domain/models/types/core";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import type { AvatarDefinition } from "components/avatar/Avatar";

import LeaderboardListItem from "../LeaderboardListItem/LeaderboardListItem";
import LeaderboardZoneDivider from "../LeaderboardZoneDivider/LeaderboardZoneDivider";

export interface LeaderboardUser {
  id: Id;
  rank: number;
  name: string;
  avatar: AvatarDefinition;
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
  /** User id for highlighted row */
  currentUserId?: Id;
  /** Optional data-test id for highlighted user row */
  currentUserDataTest?: string;
}

const Leaderboard: React.FC<ILeaderboard> = ({
  users,
  promotionEndIndex,
  neutralEndIndex,
  promotionLabel,
  neutralLabel,
  demotionLabel,
  currentUserId,
  currentUserDataTest,
}) => {
  const promotionUsers = users.slice(0, promotionEndIndex);
  const neutralUsers = users.slice(promotionEndIndex, neutralEndIndex);
  const demotionUsers = users.slice(neutralEndIndex);

  const renderUsers = (zoneUsers: LeaderboardUser[]) => {
    if (zoneUsers.length === 0) {
      return null;
    }

    return (
      <Stack component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
        {zoneUsers.map((user) => {
          const active = user.id === currentUserId;

          return (
            <Box component="li" key={user.id}>
              <LeaderboardListItem
                rank={user.rank}
                name={user.name}
                avatar={user.avatar}
                xp={user.xp}
                active={active}
                data-test={active ? currentUserDataTest : undefined}
              />
            </Box>
          );
        })}
      </Stack>
    );
  };

  const demotionDividerLabel = demotionLabel || neutralLabel;

  return (
    <Box component="section" sx={{ width: "100%" }}>
      {renderUsers(promotionUsers)}

      {promotionLabel && neutralUsers.length > 0 && (
        <LeaderboardZoneDivider label={promotionLabel} variant="promotion" />
      )}
      {renderUsers(neutralUsers)}

      {demotionDividerLabel && demotionUsers.length > 0 && (
        <LeaderboardZoneDivider
          label={demotionDividerLabel}
          variant={demotionLabel ? "demotion" : "neutral"}
        />
      )}
      {renderUsers(demotionUsers)}
    </Box>
  );
};

export default Leaderboard;
