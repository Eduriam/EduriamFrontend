"use client";

import { Card, ProgressBar } from "@eduriam/ui-core";

import { Box, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

export interface IChapterCard {
  /** Main title (e.g. course or lesson name). */
  title: string;
  /** Subtitle (e.g. chapter or section label). */
  subtitle: string;
  /** Progress in percent (0–100). */
  progress: number;
  onClick?: () => void;
  /** Value for the data-test attribute on the card (e.g. for testing). */
  "data-test"?: string;
}

const ChapterCard: React.FC<IChapterCard> = ({
  title,
  subtitle,
  progress,
  onClick,
  "data-test": dataTest,
}) => {
  const isClickable = Boolean(onClick);
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const showProgress = clampedProgress > 0;

  return (
    <Card
      onClick={onClick}
      variant={isClickable ? "clickable" : undefined}
      paddingX="medium"
      paddingY="medium"
      data-test={dataTest}
    >
      <Stack direction="column" gap={4}>
        <Stack direction="column" gap={1}>
          <Typography variant="h6" color="text.primary">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        </Stack>
        {showProgress ? (
          <ProgressBar value={clampedProgress} size="large" />
        ) : (
          <Box sx={{ height: 7 }} />
        )}
      </Stack>
    </Card>
  );
};

export default ChapterCard;
