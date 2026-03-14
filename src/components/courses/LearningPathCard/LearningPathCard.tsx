import { Card, Chip, ProgressBar } from "@eduriam/ui-core";

import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CourseLogo from "components/courses/CourseLogo/CourseLogo";

export interface ILearningPathCard {
  title: string;
  subtitle?: string;
  enrolled?: boolean;
  premium?: boolean;
  premiumLabel?: string;
  /**
   * Left icon shown on the card. Defaults to a course logo.
   */
  icon?: ReactNode;
  /**
   * Progress in percent (0-100). Only displayed when `enrolled` is true.
   */
  progress?: number;
  onClick?: () => void;
}

const LearningPathCard: React.FC<ILearningPathCard> = ({
  title,
  subtitle = "Learning Path",
  enrolled = false,
  premium = false,
  premiumLabel = "Premium",
  progress = 40,
  icon,
  onClick,
}) => {
  const isClickable = Boolean(onClick);
  const clampedProgress = Math.max(0, Math.min(100, progress ?? 0));

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
          {icon ?? <CourseLogo variant="HTML" />}
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
          <Box>
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
            <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
              {subtitle}
            </Typography>
          </Box>

          {enrolled && <ProgressBar value={clampedProgress} size="medium" />}
        </Box>
      </Box>
    </Card>
  );
};

export default LearningPathCard;
