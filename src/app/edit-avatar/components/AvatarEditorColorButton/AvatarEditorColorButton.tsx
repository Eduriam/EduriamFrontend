"use client";

import { Card } from "@eduriam/ui-core";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { useElementSize } from "util/hooks/useElementSize";

export interface IAvatarEditorColorButton {
  color: string;
  selected?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  "data-test"?: string;
  "data-avatar-field"?: string;
  "data-avatar-value"?: string;
}

const AvatarEditorColorButton: React.FC<IAvatarEditorColorButton> = ({
  color,
  selected = false,
  fullWidth = false,
  onClick,
  "data-test": dataTest,
  "data-avatar-field": dataAvatarField,
  "data-avatar-value": dataAvatarValue,
}) => {
  const [contentRef, contentSize] = useElementSize<HTMLDivElement>();
  const swatchSize =
    fullWidth && contentSize.width > 0
      ? Math.min(Math.floor(contentSize.width * 0.65), 36)
      : 36;

  return (
    <Card
      variant={selected ? "selected" : "clickable"}
      onClick={onClick}
      data-test={dataTest}
      paddingX={0}
      paddingY={0}
      sx={{
        aspectRatio: "1 / 1",
        boxSizing: "border-box",
        height: fullWidth ? undefined : 64,
        width: fullWidth ? "100%" : 64,
      }}
    >
      <Stack
        ref={contentRef}
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          sx={{
            width: swatchSize,
            height: swatchSize,
            borderRadius: "4px",
            backgroundColor: color,
          }}
          data-avatar-field={dataAvatarField}
          data-avatar-value={dataAvatarValue}
        />
      </Stack>
    </Card>
  );
};

export default AvatarEditorColorButton;
