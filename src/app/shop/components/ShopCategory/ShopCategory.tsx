"use client";

import { Card } from "@eduriam/ui-core";
import { buildShopAvatar } from "app/shop/utils/avatar";
import type { NullableAvatarPatch } from "app/shop/utils/avatar";

import Box from "@mui/material/Box";

import Avatar from "components/avatar/Avatar";

export interface IShopCategory {
  avatar?: NullableAvatarPatch;
  onClick?: () => void;
  "data-test"?: string;
}

const ShopCategory: React.FC<IShopCategory> = ({
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
          <Avatar definition={buildShopAvatar(avatar)} size={56} />
        </Box>
      </Card>
    </Box>
  );
};

export default ShopCategory;
