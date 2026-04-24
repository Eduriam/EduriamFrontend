"use client";

import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface IStudyPreviewProps {
  title: string;
  description: string;
  /**
   * Optional preview image shown above the text.
   * If not provided, an empty placeholder area is rendered.
   */
  imageSrc?: string;
  /** Optional click handler for the preview image box. */
  onImageClick?: () => void;
}

const StudyPreview: React.FC<IStudyPreviewProps> = ({
  title,
  description,
  imageSrc,
  onImageClick,
}) => {
  return (
    <Stack
      direction="column"
      spacing={5}
      alignItems="center"
      width="100%"
      maxWidth={353}
    >
      <Box
        component="button"
        type="button"
        onClick={onImageClick}
        disabled={!onImageClick}
        sx={{
          width: "100%",
          height: 272,
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "disabled",
          border: "none",
          p: 0,
          m: 0,
          display: "block",
          cursor: onImageClick ? "pointer" : "default",
        }}
      >
        {imageSrc && (
          <Box
            component="img"
            src={imageSrc}
            alt={title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
      </Box>

      <Stack alignItems="center" textAlign="center" spacing={4}>
        <Typography variant="h4">{title}</Typography>

        <Typography variant="subtitle1" color="text.secondary">
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default StudyPreview;
