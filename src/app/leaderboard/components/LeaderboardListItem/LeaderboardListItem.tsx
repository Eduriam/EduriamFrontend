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
  /** When true, highlights current user row */
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
        px: 3,
        py: 1,
        bgcolor: active ? "#292834" : "transparent",
      }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Typography
          variant="body1"
          sx={{ color: "text.primary", minWidth: 22, textAlign: "right" }}
        >
          {rank}
        </Typography>
        <Avatar definition={avatarDefinition} size={52} alt={name} />
        <Typography variant="body1" sx={{ color: "text.primary" }}>
          {name}
        </Typography>
      </Stack>
      <Typography
        variant="body1"
        sx={{
          color: active ? "text.primary" : "text.secondary",
          whiteSpace: "nowrap",
        }}
      >
        {xp} XP
      </Typography>
    </Stack>
  );
};

export default LeaderboardListItem;
