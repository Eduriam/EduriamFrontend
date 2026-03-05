"use client";

import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export type LeaderboardZoneVariant = "promotion" | "neutral" | "demotion";

export interface ILeaderboardZoneDivider {
  /** Optional label shown for zone divider (e.g. "Promotion zone") */
  label: string;
  /** Zone variant for styling */
  variant: LeaderboardZoneVariant;
}

const LeaderboardZoneDivider: React.FC<ILeaderboardZoneDivider> = ({
  label,
  variant,
}) => {
  if (!label) {
    return null;
  }

  const color =
    variant === "promotion"
      ? "#00B800"
      : variant === "demotion"
        ? "error.main"
        : "text.secondary";

  const ZoneIcon =
    variant === "demotion" ? ArrowDropDownRoundedIcon : ArrowDropUpRoundedIcon;

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
        py: 1,
      }}
    >
      <ZoneIcon sx={{ color, fontSize: 24 }} />
      <Typography variant="body1" sx={{ color, textTransform: "uppercase" }}>
        {label}
      </Typography>
      <ZoneIcon sx={{ color, fontSize: 24 }} />
    </Box>
  );
};

export default LeaderboardZoneDivider;
