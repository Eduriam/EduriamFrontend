"use client";

import { Drawer, Illustration, LargeButton } from "@eduriam/ui-core";
import { buildShopAvatar } from "app/shop/utils/avatar";
import { useTranslation } from "i18n/client";

import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Avatar from "components/avatar/Avatar";

import type { ShopItem } from "infrastructure/api/user/shop-items/ShopItems";

export interface IShopItemDetailsDrawer {
  open: boolean;
  onClose: () => void;
  item?: ShopItem;
  canBuy: boolean;
  locked: boolean;
  unlockCondition?: string;
  onBuy: () => void;
  "data-test"?: string;
}

const ShopItemDetailsDrawer: React.FC<IShopItemDetailsDrawer> = ({
  open,
  onClose,
  item,
  canBuy,
  locked,
  unlockCondition,
  onBuy,
  "data-test": dataTest = "shop-item-details-section",
}) => {
  const { t } = useTranslation("common");

  if (!item) {
    return null;
  }

  const buyDisabled = !locked && !canBuy;

  return (
    <Drawer open={open} onClose={onClose} data-test={dataTest}>
      <Stack spacing={4} sx={{ width: "100%" }}>
        <Stack direction="row" justifyContent="flex-end" width="100%">
          <IconButton aria-label={t("shop.close")} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack spacing={2} alignItems="center" sx={{ width: "100%" }}>
          {item.image.type === "avatar" ? (
            <Avatar
              definition={buildShopAvatar(item.image.avatar)}
              size={160}
            />
          ) : (
            <Illustration
              name={
                item.image.illustration as React.ComponentProps<
                  typeof Illustration
                >["name"]
              }
              width={160}
              height={160}
            />
          )}

          <Stack direction="row" spacing={1} alignItems="center">
            <Illustration name="coin" width={32} height={32} />
            <Typography variant="h5">{item.price}</Typography>
          </Stack>
        </Stack>

        {locked && unlockCondition && (
          <Typography
            variant="subtitle1"
            textAlign="center"
            data-test="unlock-conditions-section"
          >
            {unlockCondition}
          </Typography>
        )}

        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          {locked ? (
            <LargeButton data-test="buy-item-locked-button" disabled>
              {t("shop.locked")}
            </LargeButton>
          ) : (
            <LargeButton
              disabled={buyDisabled}
              onClick={buyDisabled ? undefined : onBuy}
              data-test={
                buyDisabled ? "buy-item-disabled-button" : "buy-item-button"
              }
            >
              {t("shop.buy")}
            </LargeButton>
          )}
        </Box>
      </Stack>
    </Drawer>
  );
};

export default ShopItemDetailsDrawer;
