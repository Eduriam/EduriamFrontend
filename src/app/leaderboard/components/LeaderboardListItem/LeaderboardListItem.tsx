"use client";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import Avatar, { type AvatarDefinition } from "components/avatar/Avatar";

export interface ILeaderboardListItem {
  /** 1-based rank in the leaderboard */
  rank: number;
  /** Display name of the user */
  name: string;
  /** Avatar layer definition passed to Avatar component */
  avatarDefinition: AvatarDefinition;
  /** XP gained by the user */
  xp: number;
  /** When true, applies paper background color to highlight the item */
  active?: boolean;
  /** Optional data attribute for E2E tests */
  "data-test"?: string;
}

const LeaderboardListItem: React.FC<ILeaderboardListItem> = ({
  rank,
  name,
  avatarDefinition,
  xp,
  active = false,
  "data-test": dataTest,
}) => {
  return (
    <Stack
      component="article"
      data-test={dataTest}
      sx={{
        width: "100%",
        paddingY: 2,
        paddingX: 3,
        ...(active && { bgcolor: "background.paper" }),
      }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack direction="row" alignItems="center" spacing={3}>
        <Typography variant="body1" fontWeight="bold">
          {rank}
        </Typography>
        <Avatar definition={avatarDefinition} size="small" alt={name} />
        <Typography variant="body1">{name}</Typography>
      </Stack>
      <Stack>
        <Typography variant="body1" color="text.secondary">
          {xp} XP
        </Typography>
      </Stack>
    </Stack>
  );
};

export default LeaderboardListItem;
