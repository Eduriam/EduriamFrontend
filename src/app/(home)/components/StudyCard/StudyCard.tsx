"use client";

import { LargeButton } from "@eduriam/ui-core";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface IStudyCardProps {
  subtitle: string;
  title: string;
  buttonLabel: string;
  onStartClick: () => void;
  "data-test-start-button"?: string;
}

const StudyCard: React.FC<IStudyCardProps> = ({
  subtitle,
  title,
  buttonLabel,
  onStartClick,
  "data-test-start-button": dataTestStartButton,
}) => {
  return (
    <Stack
      spacing="28px"
      sx={(theme) => ({
        width: "100%",
        maxWidth: 357,
        border: `2px solid ${theme.palette.divider}`,
        borderRadius: 4,
        px: "20px",
        py: "24px",
      })}
    >
      <Stack spacing={2}>
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
        <Typography variant="h5">{title}</Typography>
      </Stack>

      <LargeButton
        fullWidth
        onClick={onStartClick}
        data-test={dataTestStartButton}
      >
        {buttonLabel}
      </LargeButton>
    </Stack>
  );
};

export default StudyCard;
