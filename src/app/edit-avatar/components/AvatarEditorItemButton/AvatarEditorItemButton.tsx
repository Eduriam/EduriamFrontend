"use client";

import { Card } from "@eduriam/ui-core";
import Stack from "@mui/material/Stack";

import Avatar, { type AvatarDefinition } from "components/avatar/Avatar";
import { useElementSize } from "util/hooks/useElementSize";

export interface IAvatarEditorItemButton {
  preview: AvatarDefinition;
  selected?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  "data-test"?: string;
}

const AvatarEditorItemButton: React.FC<IAvatarEditorItemButton> = ({
  preview,
  selected = false,
  fullWidth = false,
  onClick,
  "data-test": dataTest,
}) => {
  const [contentRef, contentSize] = useElementSize<HTMLDivElement>();
  const avatarSize =
    fullWidth && contentSize.width > 0
      ? Math.min(Math.floor(contentSize.width * 0.8), 64)
      : 64;

  return (
    <Card
      variant={selected ? "selected" : "clickable"}
      onClick={onClick}
      data-test={dataTest}
      paddingX="small"
      paddingY="small"
      sx={{
        aspectRatio: "1 / 1",
        boxSizing: "border-box",
        height: fullWidth ? undefined : 100,
        width: fullWidth ? "100%" : 100,
      }}
    >
      <Stack
        ref={contentRef}
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Avatar definition={preview} size={avatarSize} />
      </Stack>
    </Card>
  );
};

export default AvatarEditorItemButton;
