"use client";

import { ContentContainer, PageRoot } from "@eduriam/ui-core";
import ShopItem from "app/shop/components/ShopItem/ShopItem";
import ShopItemDetailsDrawer from "app/shop/components/ShopItemDetailsDrawer/ShopItemDetailsDrawer";
import ShopNavbar from "app/shop/components/ShopNavbar/ShopNavbar";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useEffect, useMemo, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { optimisticMutationOption } from "infrastructure/api/API";
import errorCodes from "infrastructure/api/error-codes";
import type { ShopItem as ShopItemModel } from "infrastructure/api/user/shop-items/ShopItems";
import ShopItemsAPI from "infrastructure/api/user/shop-items/ShopItemsAPI";
import useAuth from "infrastructure/services/AuthProvider";
import useErrorHandler from "infrastructure/services/ErrorHandler";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { shopCategories } from "../shopCategories";

const ShopCategoryPage: React.FC = () => {
  const { t } = useTranslation("common");
  const { t: tError } = useTranslation("error-codes");
  const navigateWithTransition = useTransitionNavigationHandler();
  const router = useRouter();
  const params = useParams();
  const { setError } = useErrorHandler();
  const { user, mutateUser } = useAuth();
  const { shopItems = [], mutate } = ShopItemsAPI.useShopItems();

  const [selectedItemId, setSelectedItemId] = useState<Id | null>(null);

  const categoryParam = params?.category;
  const categoryId =
    typeof categoryParam === "string"
      ? categoryParam
      : categoryParam?.[0] || "";

  const category = shopCategories.find((entry) => entry.id === categoryId);

  useEffect(() => {
    if (!category) {
      router.replace("/shop");
    }
  }, [category, router]);

  const categoryItems = useMemo(
    () =>
      shopItems
        .filter((item) => item.categoryId === categoryId)
        .sort((a, b) => a.price - b.price),
    [categoryId, shopItems],
  );

  const selectedItem = useMemo(
    () => categoryItems.find((item) => item.id === selectedItemId),
    [categoryItems, selectedItemId],
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

  if (!category) {
    return null;
  }

  return (
    <PageRoot data-test="shop-category-page">
      <PageNavigation topNavigation={<ShopNavbar
        leftButton={{
          icon: "chevronLeft",
          onClick: navigateWithTransition("/shop", {
            direction: "back",
          }),
        }}
        balance={user?.balance ?? 0}
      />} mainNavigation="hidden" />

      <ContentContainer width="small" justifyContent="flex-start" spacing={8}>
        <Typography variant="h5">{t(category.nameKey)}</Typography>

        <Stack
          direction="row"
          spacing={1.5}
          flexWrap="wrap"
          useFlexGap
          data-test="shop-items-category-section"
        >
          {categoryItems.map((item) => {
            const locked = !!item.achievementLock && item.bought !== true;

            return (
              <ShopItem
                key={item.id}
                item={item}
                locked={locked}
                data-test={
                  locked ? "locked-shop-item-button" : "shop-item-button"
                }
                onClick={() => setSelectedItemId(item.id)}
              />
            );
          })}
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

export default ShopCategoryPage;
