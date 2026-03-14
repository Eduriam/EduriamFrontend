import { Card, Chip, ProgressBar } from "@eduriam/ui-core";

import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CourseLogo from "components/courses/CourseLogo/CourseLogo";

export interface ICourseCard {
  title: string;
  enrolled?: boolean;
  premium?: boolean;
  premiumLabel?: string;
  /**
   * Progress in percent (0-100). Only displayed when `enrolled` is true.
   */
  progress?: number;
  /**
   * Left icon shown on the card. Defaults to a course logo.
   */
  icon?: ReactNode;
  onClick?: () => void;
}

const CourseCard: React.FC<ICourseCard> = ({
  title,
  enrolled = false,
  premium = false,
  premiumLabel = "Premium",
  progress = 40,
  icon,
  onClick,
}) => {
  const isClickable = Boolean(onClick);

  return (
    <Card
      onClick={onClick}
      variant={isClickable ? "clickable" : undefined}
      sx={{ position: "relative" }}
    >
      {premium && (
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <Chip
            label={premiumLabel}
            color="chipYellow"
            size="small"
            variant="filled"
          />
        </Box>
      )}

      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Box sx={{ width: "64px", height: "64px", flex: "0 0 auto" }}>
          {icon ?? <CourseLogo variant="JavaScript" />}
        </Box>

        <Box
          sx={{
            width: "229px",
            display: "flex",
            flexDirection: "column",
            gap: enrolled ? "8px" : 0,
            justifyContent: enrolled ? "flex-start" : "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "22px",
              lineHeight: "28px",
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            {title}
          </Typography>

          {enrolled && <ProgressBar value={progress} size="medium" />}
        </Box>
      </Box>
    </Card>
  );
};

export default CourseCard;
