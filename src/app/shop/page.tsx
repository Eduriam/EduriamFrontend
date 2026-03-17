"use client";

import { ContentContainer, PageRoot } from "@eduriam/ui-core";
import ShopCategory from "app/shop/components/ShopCategory/ShopCategory";
import ShopItem from "app/shop/components/ShopItem/ShopItem";
import ShopItemDetailsDrawer from "app/shop/components/ShopItemDetailsDrawer/ShopItemDetailsDrawer";
import ShopNavbar from "app/shop/components/ShopNavbar/ShopNavbar";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useMemo, useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { AvatarDefinition } from "components/avatar/Avatar";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { optimisticMutationOption } from "infrastructure/api/API";
import errorCodes from "infrastructure/api/error-codes";
import type { ShopItem as ShopItemModel } from "infrastructure/api/user/shop-items/ShopItems";
import ShopItemsAPI from "infrastructure/api/user/shop-items/ShopItemsAPI";
import useAuth from "infrastructure/services/AuthProvider";
import useErrorHandler from "infrastructure/services/ErrorHandler";

import { shopCategories } from "./shopCategories";

export interface IShopPage {}

const STREAK_FREEZE_IDS = ["streak-freeze-1", "streak-freeze-2"];

const ShopPage: React.FC<IShopPage> = () => {
  const { t } = useTranslation("common");
  const { t: tError } = useTranslation("error-codes");
  const navigateWithTransition = useTransitionNavigationHandler();
  const { user, mutateUser } = useAuth();
  const { setError } = useErrorHandler();
  const { shopItems = [], mutate } = ShopItemsAPI.useShopItems();

  const [selectedItemId, setSelectedItemId] = useState<Id | null>(null);

  const streakFreezeItems = useMemo(
    () =>
      STREAK_FREEZE_IDS.map((id) =>
        shopItems.find((item) => item.id === id),
      ).filter((item): item is NonNullable<typeof item> => Boolean(item)),
    [shopItems],
  );

  const selectedItem = useMemo(
    () => shopItems.find((item) => item.id === selectedItemId),
    [selectedItemId, shopItems],
  );

  const selectedItemLocked =
    !!selectedItem?.achievementLock && selectedItem.bought !== true;

  const canBuySelectedItem =
    !!selectedItem && (user?.balance ?? 0) >= selectedItem.price;

  const unlockCondition =
    selectedItem?.achievementLock && selectedItemLocked
      ? t("shop.unlockRequirement", {
          achievementName: t(
            `achievements.achievementsById.${selectedItem.achievementLock.achievementId}`,
          ),
        })
      : undefined;

  const previewAvatarByCategory = useMemo(() => {
    const entries = new Map<string, Partial<AvatarDefinition>>();

    shopItems.forEach((item) => {
      if (item.image.type === "avatar" && !entries.has(item.categoryId)) {
        entries.set(item.categoryId, item.image.avatar);
      }
    });

    return entries;
  }, [shopItems]);

  const handleBuy = async () => {
    if (!selectedItem) {
      return;
    }

    const updatedArray = shopItems.map((item) => {
      if (item.id === selectedItem.id) {
        return { ...item, bought: true };
      }

      return item;
    });

    mutate(async () => {
      try {
        await ShopItemsAPI.patchShopItem(selectedItem.id, { bought: true });
        mutateUser({
          balance: Math.max((user?.balance ?? 0) - selectedItem.price, 0),
        });
      } catch (err) {
        if (err === errorCodes.notEnoughMoney) {
          setError(tError("notEnoughMoney"));
        }

        return Promise.reject(err);
      }

      return updatedArray;
    }, optimisticMutationOption<Array<ShopItemModel>>(updatedArray));

    setSelectedItemId(null);
  };

  return (
    <PageRoot data-test="shop-page">
      <PageNavigation
        topNavigation={
          <ShopNavbar
            leftButton={{
              icon: "close",
              onClick: navigateWithTransition(
                user?.id ? `/users/${user.id}` : "/",
                {
                  direction: "back",
                },
              ),
            }}
            balance={user?.balance ?? 0}
          />
        }
        mainNavigation="hidden"
      />

      <ContentContainer width="small" justifyContent="flex-start" spacing={10}>
        <Stack spacing={3} width="100%" data-test="streak-freeze-items-section">
          <Typography variant="h6">{t("shop.streakFreezeTitle")}</Typography>
          <Typography variant="body1" color="text.secondary">
            {t("shop.streakFreezeDescription")}
          </Typography>

          <Stack direction="row" spacing={1.5}>
            {streakFreezeItems.map((item) => (
              <ShopItem
                key={item.id}
                item={item}
                locked={!!item.achievementLock && item.bought !== true}
                onClick={() => setSelectedItemId(item.id)}
                data-test="streak-freeze-item-button"
              />
            ))}
          </Stack>
        </Stack>

        <Stack spacing={3} width="100%" data-test="shop-item-categories">
          <Typography variant="h5">{t("shop.characterTitle")}</Typography>

          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {shopCategories.map((category) => (
              <Stack key={category.id} spacing={1}>
                <Typography variant="body1" color="text.secondary">
                  {t(category.nameKey)}
                </Typography>
                <ShopCategory
                  avatar={previewAvatarByCategory.get(category.id)}
                  onClick={navigateWithTransition(`/shop/${category.id}`)}
                  data-test="shop-item-category"
                />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </ContentContainer>

      <ShopItemDetailsDrawer
        open={Boolean(selectedItem)}
        onClose={() => setSelectedItemId(null)}
        item={selectedItem}
        canBuy={canBuySelectedItem}
        locked={selectedItemLocked}
        unlockCondition={unlockCondition}
        onBuy={handleBuy}
      />
    </PageRoot>
  );
};

export default ShopPage;
