"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface IAchievementBadge {
  completed?: boolean;
  badgeIconName?: "achievement-1" | "achievement-2";
  name?: string;
  showText?: boolean;
  size?: "medium" | "large";
  "data-test"?: string;
}

const badgeSizeConfig = {
  medium: {
    width: 100,
    imageSize: 80,
  },
  large: {
    width: 180,
    imageSize: 180,
  },
} satisfies Record<
  NonNullable<IAchievementBadge["size"]>,
  { width: number; imageSize: number }
>;

const AchievementBadge: React.FC<IAchievementBadge> = ({
  completed = true,
  badgeIconName = "achievement-1",
  name,
  showText = false,
  size = "medium",
  "data-test": dataTest,
}) => {
  const imageSrc = `/images/achievements/${badgeIconName}${
    completed ? "" : "-disabled"
  }.svg`;
  const sizeConfig = badgeSizeConfig[size];

  return (
    <Box
      sx={{
        width: sizeConfig.width,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: showText ? 0.5 : 0,
      }}
      data-test={dataTest}
    >
      <Box
        component="img"
        src={imageSrc}
        alt={completed ? "completed achievement" : "locked achievement"}
        sx={{
          width: sizeConfig.imageSize,
          height: sizeConfig.imageSize,
          display: "block",
        }}
      />

      {showText && (
        <Typography
          variant="caption"
          sx={{
            textAlign: "center",
            color: "text.primary",
            lineHeight: "14.5px",
            minHeight: "29px",
          }}
        >
          {name ?? ""}
        </Typography>
      )}
    </Box>
  );
};

export default AchievementBadge;
