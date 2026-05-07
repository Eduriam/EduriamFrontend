"use client";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

export interface IAchievementBadge {
  completed?: boolean;
  badgeIconName?: "achievement-1" | "achievement-2";
  name?: string;
  onClick?: () => void;
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
  onClick,
  showText = false,
  size = "medium",
  "data-test": dataTest,
}) => {
  const imageSrc = `/images/achievements/${badgeIconName}${
    completed ? "" : "-disabled"
  }.svg`;
  const sizeConfig = badgeSizeConfig[size];
  const rootSx = {
    width: sizeConfig.width,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: showText ? 0.5 : 0,
    borderRadius: 2,
  };
  const content = (
    <>
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
            color: completed ? "text.primary" : "text.disabled",
            lineHeight: "14.5px",
            minHeight: "29px",
          }}
        >
          {name ?? ""}
        </Typography>
      )}
    </>
  );

  if (onClick) {
    return (
      <ButtonBase onClick={onClick} sx={rootSx} data-test={dataTest}>
        {content}
      </ButtonBase>
    );
  }

  return (
    <Box sx={rootSx} data-test={dataTest}>
      {content}
    </Box>
  );
};

export default AchievementBadge;
