"use client";

import { Card } from "@eduriam/ui-core";

import Box from "@mui/material/Box";

import Avatar, { type AvatarDefinition } from "components/avatar/Avatar";

export interface IAvatarCategoryButton {
  avatar: AvatarDefinition;
  onClick?: () => void;
  "data-test"?: string;
}

const AvatarCategoryButton: React.FC<IAvatarCategoryButton> = ({
  avatar,
  onClick,
  "data-test": dataTest,
}) => {
  return (
    <Box sx={{ width: 100, height: 100 }}>
      <Card
        variant={onClick ? "clickable" : "default"}
        onClick={onClick}
        data-test={dataTest}
        paddingX="small"
        paddingY="large"
      >
        <Box display="flex" justifyContent="center">
          <Avatar definition={avatar} size={56} />
        </Box>
      </Card>
    </Box>
  );
};

export default AvatarCategoryButton;
