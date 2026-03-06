"use client";

import { Card } from "@eduriam/ui-core";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export interface IAvatarEditorColorButton {
  color: string;
  selected?: boolean;
  onClick?: () => void;
  "data-test"?: string;
  "data-avatar-field"?: string;
  "data-avatar-value"?: string;
}

const AvatarEditorColorButton: React.FC<IAvatarEditorColorButton> = ({
  color,
  selected = false,
  onClick,
  "data-test": dataTest,
  "data-avatar-field": dataAvatarField,
  "data-avatar-value": dataAvatarValue,
}) => {
  return (
    <Card
      variant={selected ? "selected" : "clickable"}
      onClick={onClick}
      data-test={dataTest}
      paddingX={0}
      paddingY={0}
      sx={{ width: 64, height: 64 }}
    >
      <Stack width="100%" height="100%" alignItems="center" justifyContent="center">
        <Box
          sx={{
            width: 36,
            height: 36,
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
