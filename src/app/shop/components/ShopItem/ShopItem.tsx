"use client";

import { Card, Illustration } from "@eduriam/ui-core";
import { buildShopAvatar } from "app/shop/utils/avatar";

import * as React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Avatar from "components/avatar/Avatar";
import { toIllustrationName } from "app/shop/utils/shopItem";
import { useElementSize } from "util/hooks/useElementSize";

import {
  ShopImageKind,
  type ShopItemViewModel,
} from "infrastructure/api/generated/models";

export interface IShopItem {
  item: ShopItemViewModel;
  purchased?: boolean;
  locked?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  "data-test"?: string;
}

const CARD_SIZE = 100;
const PREVIEW_SIZE = 56;

const ShopItem: React.FC<IShopItem> = ({
  item,
  purchased = false,
  locked = false,
  fullWidth = false,
  onClick,
  "data-test": dataTest,
}) => {
  const [contentRef, contentSize] = useElementSize<HTMLDivElement>();
  const previewSize =
    fullWidth && contentSize.width > 0
      ? Math.min(Math.floor(contentSize.width * 0.7), PREVIEW_SIZE)
      : PREVIEW_SIZE;
  const priceIconSize =
    fullWidth && contentSize.width > 0
      ? Math.min(Math.max(Math.floor(contentSize.width * 0.22), 16), 20)
      : 20;
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
    <Box
      sx={{
        aspectRatio: "1 / 1",
        height: fullWidth ? undefined : CARD_SIZE,
        width: fullWidth ? "100%" : CARD_SIZE,
      }}
    >
      <Card
        variant={cardVariant as React.ComponentProps<typeof Card>["variant"]}
        onClick={onClick}
        data-test={dataTest}
        paddingX="small"
        paddingY="small"
        sx={{
          boxSizing: "border-box",
          height: "100%",
          width: "100%",
          ...(boughtCardSx ?? {}),
        }}
      >
        <Stack
          ref={contentRef}
          alignItems="center"
          height="100%"
          justifyContent="center"
          spacing={0.75}
          width="100%"
        >
          <Box sx={{ height: previewSize, width: previewSize }}>
            {item.image.kind === ShopImageKind.Avatar ? (
              <Avatar
                definition={buildShopAvatar(item.image.avatar ?? {})}
                size={previewSize}
                alt={item.name}
              />
            ) : (
              <Illustration
                name={toIllustrationName(item.image.illustration?.kind)}
                width={previewSize}
                height={previewSize}
              />
            )}
          </Box>

          {showPrice && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Illustration
                name={priceCoinIllustration}
                width={priceIconSize}
                height={priceIconSize}
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
