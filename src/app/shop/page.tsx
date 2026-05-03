"use client";

import { ContentContainer, PageRoot } from "@eduriam/ui-core";
import ShopItem from "app/shop/components/ShopItem/ShopItem";
import ShopItemDetailsDrawer from "app/shop/components/ShopItemDetailsDrawer/ShopItemDetailsDrawer";
import ShopNavbar from "app/shop/components/ShopNavbar/ShopNavbar";
import { buildShopAvatar } from "app/shop/utils/avatar";
import {
  getShopItemCategoryId,
  isShopItemPurchased,
} from "app/shop/utils/shopItem";
import { Id } from "domain/models/types/core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useMemo, useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ResponsiveItemGrid from "components/ResponsiveItemGrid/ResponsiveItemGrid";
import AvatarCategoryGrid from "components/avatar/AvatarCategoryGrid/AvatarCategoryGrid";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { optimisticMutationOption } from "infrastructure/api/API";
import {
  ApplicationProblemDetailsCode,
  type UserOwnedShopItemModel,
} from "infrastructure/api/generated/models";
import useAuth from "infrastructure/services/AuthProvider";
import useErrorHandler from "infrastructure/services/ErrorHandler";
import { ShopService } from "infrastructure/services/shop/ShopService";

import { shopCategories } from "./shopCategories";

export interface IShopPage {}

const ShopPage: React.FC<IShopPage> = () => {
  const { t } = useTranslation("common");
  const { t: tError } = useTranslation("error-codes");
  const navigateWithTransition = useTransitionNavigationHandler();
  const { user, mutateUser } = useAuth();
  const { setError } = useErrorHandler();
  const { shopItems = [] } = ShopService.useShopItems();
  const { ownedShopItems = [], mutate: mutateOwnedShopItems } =
    ShopService.useOwnedShopItems();

  const [selectedItemId, setSelectedItemId] = useState<Id | null>(null);

  const streakFreezeItems = useMemo(
    () =>
      shopItems.filter(
        (item) => getShopItemCategoryId(item) === "streak-freeze",
      ),
    [shopItems],
  );

  const selectedItem = useMemo(
    () => shopItems.find((item) => item.id === selectedItemId),
    [selectedItemId, shopItems],
  );

  const selectedItemPurchased =
    selectedItem !== undefined
      ? isShopItemPurchased(selectedItem, ownedShopItems)
      : false;

  const selectedItemLocked =
    selectedItem?.isLocked === true && !selectedItemPurchased;

  const canBuySelectedItem =
    !!selectedItem && (user?.balance ?? 0) >= selectedItem.price;

  const unlockCondition =
    selectedItem?.requiredAchievementId && selectedItemLocked
      ? t("shop.unlockRequirement", {
          achievementName: t(
            `achievements.achievementsById.${selectedItem.requiredAchievementId}`,
          ),
        })
      : undefined;

  const handleBuy = async () => {
    if (!selectedItem) {
      return;
    }

    const optimisticOwnedItem: UserOwnedShopItemModel = {
      id: Date.now(),
      shopItemId: selectedItem.id,
      shopItemName: selectedItem.name,
      type: selectedItem.type,
      image: selectedItem.image,
      purchasedAt: new Date().toISOString(),
      consumedAt: null,
    };

    mutateOwnedShopItems(
      async () => {
        try {
          await ShopService.purchaseShopItem(selectedItem.id);
          mutateUser({
            balance: Math.max((user?.balance ?? 0) - selectedItem.price, 0),
          });
        } catch (err) {
          if (err === ApplicationProblemDetailsCode.INSUFFICIENT_BALANCE) {
            setError(tError("notEnoughMoney"));
          }

          return Promise.reject(err);
        }

        return [...ownedShopItems, optimisticOwnedItem];
      },
      optimisticMutationOption<Array<UserOwnedShopItemModel>>([
        ...ownedShopItems,
        optimisticOwnedItem,
      ]),
    );

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
        mainNavigation="desktopOnly"
      />

      <ContentContainer width="small" justifyContent="flex-start" spacing={10}>
        <Stack spacing={3} width="100%" data-test="streak-freeze-items-section">
          <Typography variant="h6">{t("shop.streakFreezeTitle")}</Typography>
          <Typography variant="body1" color="text.secondary">
            {t("shop.streakFreezeDescription")}
          </Typography>

          <ResponsiveItemGrid>
            {streakFreezeItems.map((item) => (
              <ShopItem
                key={item.id}
                item={item}
                fullWidth
                purchased={isShopItemPurchased(item, ownedShopItems)}
                locked={
                  item.isLocked && !isShopItemPurchased(item, ownedShopItems)
                }
                onClick={() => setSelectedItemId(item.id)}
                data-test="streak-freeze-item-button"
              />
            ))}
          </ResponsiveItemGrid>
        </Stack>

        <Stack spacing={3} width="100%" data-test="shop-item-categories">
          <Typography variant="h5">{t("shop.characterTitle")}</Typography>

          <AvatarCategoryGrid
            data-test="shop-categories-grid"
            items={shopCategories.map((category) => ({
              id: category.id,
              labelKey: category.nameKey,
              avatar: buildShopAvatar(category.previewAvatar),
              onClick: navigateWithTransition(`/shop/${category.id}`),
              "data-test": "shop-item-category",
            }))}
          />
        </Stack>
      </ContentContainer>

      <ShopItemDetailsDrawer
        open={Boolean(selectedItem)}
        onClose={() => setSelectedItemId(null)}
        item={selectedItem}
        purchased={selectedItemPurchased}
        canBuy={canBuySelectedItem}
        locked={selectedItemLocked}
        unlockCondition={unlockCondition}
        onBuy={handleBuy}
      />
    </PageRoot>
  );
};

export default ShopPage;
