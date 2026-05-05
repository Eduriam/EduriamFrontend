"use client";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import CourseLogo from "components/courses/CourseLogo/CourseLogo";

export interface IStudyPreviewProps {
  title: string;
  subtitle: string;
  /**
   * Visual variant of the course logo shown above the text.
   */
  logoVariant?: string | null;
  /** Optional click handler for the preview area. */
  onPreviewClick?: () => void;
}

const StudyPreview: React.FC<IStudyPreviewProps> = ({
  title,
  subtitle,
  logoVariant,
  onPreviewClick,
}) => {
  const isClickable = Boolean(onPreviewClick);

  return (
    <Stack
      component={isClickable ? "button" : "div"}
      type={isClickable ? "button" : undefined}
      onClick={onPreviewClick}
      direction="column"
      spacing="32px"
      alignItems="center"
      width="100%"
      maxWidth={353}
      sx={{
        border: 0,
        background: "transparent",
        appearance: "none",
        p: 0,
        m: 0,
        cursor: isClickable ? "pointer" : "default",
        color: "text.primary",
        font: "inherit",
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ width: 128, height: 128 }}
      >
        <CourseLogo variant={logoVariant} size="xlarge" />
      </Stack>

      <Stack alignItems="center" textAlign="center" spacing="8px" width="100%">
        <Typography variant="h4">{title}</Typography>

        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default StudyPreview;
