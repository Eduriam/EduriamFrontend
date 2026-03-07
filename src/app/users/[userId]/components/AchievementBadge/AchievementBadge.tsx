"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface IAchievementBadge {
  completed?: boolean;
  badgeIconName?: "achievement-1" | "achievement-2";
  name?: string;
  showText?: boolean;
  "data-test"?: string;
}

const AchievementBadge: React.FC<IAchievementBadge> = ({
  completed = true,
  badgeIconName = "achievement-1",
  name,
  showText = false,
  "data-test": dataTest,
}) => {
  const imageSrc = `/images/achievements/${badgeIconName}${
    completed ? "" : "-disabled"
  }.svg`;

  return (
    <Box
      sx={{
        width: 100,
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
        sx={{ width: 80, height: 80, display: "block" }}
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
