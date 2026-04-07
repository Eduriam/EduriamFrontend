"use client";

import { Card, Illustration } from "@eduriam/ui-core";
import { buildShopAvatar } from "app/shop/utils/avatar";

import * as React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Avatar from "components/avatar/Avatar";
import { toIllustrationName } from "app/shop/utils/shopItem";

import {
  ShopImageKind,
  type ShopItemViewModel,
} from "infrastructure/api/generated/models";

export interface IShopItem {
  item: ShopItemViewModel;
  purchased?: boolean;
  locked?: boolean;
  onClick?: () => void;
  "data-test"?: string;
}

const CARD_SIZE = 100;
const PREVIEW_SIZE = 56;

const ShopItem: React.FC<IShopItem> = ({
  item,
  purchased = false,
  locked = false,
  onClick,
  "data-test": dataTest,
}) => {
  const shopItemState = purchased ? "bought" : locked ? "locked" : "default";
  const showPrice = shopItemState !== "bought";
  const priceCoinIllustration =
    shopItemState === "locked" ? "coinDisabled" : "coin";
  const cardVariant =
    shopItemState === "default"
      ? "clickable"
      : shopItemState === "locked"
        ? "disabled"
        : "default";
  const boughtCardSx =
    shopItemState === "bought"
      ? {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }
      : undefined;

  return (
    <Box sx={{ width: CARD_SIZE, height: CARD_SIZE }}>
      <Card
        variant={cardVariant as React.ComponentProps<typeof Card>["variant"]}
        onClick={onClick}
        data-test={dataTest}
        paddingX="small"
        paddingY="small"
        sx={{
          height: CARD_SIZE,
          widht: CARD_SIZE,
          ...(boughtCardSx ?? {}),
        }}
      >
        <Stack alignItems="center" justifyContent="center" spacing={0.75}>
          <Box sx={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }}>
            {item.image.kind === ShopImageKind.Avatar ? (
              <Avatar
                definition={buildShopAvatar(item.image.avatar ?? {})}
                size={PREVIEW_SIZE}
                alt={item.name}
              />
            ) : (
              <Illustration
                name={toIllustrationName(item.image.illustration?.kind)}
                width={PREVIEW_SIZE}
                height={PREVIEW_SIZE}
              />
            )}
          </Box>

          {showPrice && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Illustration
                name={priceCoinIllustration}
                width={20}
                height={20}
              />
              <Typography
                variant="body2"
                color={
                  shopItemState === "locked" ? "text.disabled" : "text.primary"
                }
              >
                {item.price}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default ShopItem;
