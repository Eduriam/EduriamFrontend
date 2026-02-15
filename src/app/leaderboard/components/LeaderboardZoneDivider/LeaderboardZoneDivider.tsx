"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export type LeaderboardZoneVariant = "promotion" | "neutral" | "demotion";

export interface ILeaderboardZoneDivider {
  /** Optional label shown above or beside the divider (e.g. "Promotion zone") */
  label: string;
  /** Zone variant for optional styling (promotion = positive, demotion = negative) */
  variant: LeaderboardZoneVariant;
}

const LeaderboardZoneDivider: React.FC<ILeaderboardZoneDivider> = ({
  label,
  variant,
}) => {
  const labelColor =
    variant === "promotion"
      ? "success.main"
      : variant === "demotion"
        ? "error.main"
        : "text.secondary";

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        paddingY: 2,
      }}
    >
      {label && (
        <Typography variant="subtitle2" color={labelColor}>
          {label}
        </Typography>
      )}
      <Box
        component="hr"
        sx={{
          border: "none",
          borderTop: 1,
          borderColor: "divider",
          margin: 0,
        }}
      />
    </Box>
  );
};

export default LeaderboardZoneDivider;
