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
}

const StudyPreview: React.FC<IStudyPreviewProps> = ({
  title,
  description,
  imageSrc,
}) => {
  return (
    <Stack
      direction="column"
      spacing={5}
      alignItems="center"
      width="100%"
      maxWidth={353}
    >
      <Stack
        width="100%"
        height={272}
        borderRadius={2}
        overflow="hidden"
        bgcolor="disabled"
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
      </Stack>

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
