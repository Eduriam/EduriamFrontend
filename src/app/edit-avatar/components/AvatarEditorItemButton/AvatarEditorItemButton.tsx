"use client";

import { Card } from "@eduriam/ui-core";
import Stack from "@mui/material/Stack";

import Avatar, { type AvatarDefinition } from "components/avatar/Avatar";

export interface IAvatarEditorItemButton {
  preview: AvatarDefinition;
  selected?: boolean;
  onClick?: () => void;
  "data-test"?: string;
}

const AvatarEditorItemButton: React.FC<IAvatarEditorItemButton> = ({
  preview,
  selected = false,
  onClick,
  "data-test": dataTest,
}) => {
  return (
    <Card
      variant={selected ? "selected" : "clickable"}
      onClick={onClick}
      data-test={dataTest}
      paddingX="small"
      paddingY="small"
      sx={{ width: 100, height: 100 }}
    >
      <Stack width="100%" height="100%" alignItems="center" justifyContent="center">
        <Avatar definition={preview} size={64} />
      </Stack>
    </Card>
  );
};

export default AvatarEditorItemButton;
