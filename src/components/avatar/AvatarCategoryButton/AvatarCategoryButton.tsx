"use client";

import { Card } from "@eduriam/ui-core";
import { useElementSize } from "util/hooks/useElementSize";

import Box from "@mui/material/Box";

import Avatar, { type AvatarDefinition } from "components/avatar/Avatar";

export interface IAvatarCategoryButton {
  avatar: AvatarDefinition;
  fullWidth?: boolean;
  onClick?: () => void;
  "data-test"?: string;
}

const AvatarCategoryButton: React.FC<IAvatarCategoryButton> = ({
  avatar,
  fullWidth = false,
  onClick,
  "data-test": dataTest,
}) => {
  const [contentRef, contentSize] = useElementSize<HTMLDivElement>();
  const avatarSize =
    fullWidth && contentSize.width > 0
      ? Math.min(Math.floor(contentSize.width * 0.8), 56)
      : 56;

  return (
    <Box
      sx={{
        aspectRatio: "1 / 1",
        height: fullWidth ? undefined : 100,
        width: fullWidth ? "100%" : 100,
      }}
    >
      <Card
        variant={onClick ? "clickable" : "default"}
        onClick={onClick}
        data-test={dataTest}
        paddingX="small"
        paddingY="large"
        sx={{ boxSizing: "border-box", height: "100%", width: "100%" }}
      >
        <Box
          ref={contentRef}
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Avatar definition={avatar} size={avatarSize} />
        </Box>
      </Card>
    </Box>
  );
};

export default AvatarCategoryButton;
