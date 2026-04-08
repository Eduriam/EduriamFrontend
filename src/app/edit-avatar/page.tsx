"use client";

import {
  BasicNavbar,
  ContentContainer,
  Header,
  PageRoot,
} from "@eduriam/ui-core";
import { buildShopAvatar } from "app/shop/utils/avatar";
import { useTranslation } from "i18n/client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import Stack from "@mui/material/Stack";

import Avatar from "components/avatar/Avatar";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { optimisticMutationOption } from "infrastructure/api/API";
import type { AvatarModel } from "infrastructure/api/generated/models";
import { SettingsService } from "infrastructure/services/users/SettingsService";
import { ShopService } from "infrastructure/services/shop/ShopService";

import AvatarCategoryDialog from "./components/AvatarCategoryDialog/AvatarCategoryDialog";
import AvatarEditorItemButton from "./components/AvatarEditorItemButton/AvatarEditorItemButton";
import LeaveAvatarEditorDrawer from "./components/LeaveAvatarEditorDrawer/LeaveAvatarEditorDrawer";
import {
  type AvatarCategory,
  buildCategoryPreview,
  collectAvatarCategories,
  serializeAvatar,
} from "./components/avatarEditorTypes";

export interface IEditAvatarPage {}

const EditAvatarPage: React.FC<IEditAvatarPage> = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const { settings, mutate } = SettingsService.useSettings();
  const { ownedShopItems = [] } = ShopService.useOwnedShopItems();

  const [baseAvatar, setBaseAvatar] = useState<AvatarModel>(buildShopAvatar());
  const [draftAvatar, setDraftAvatar] = useState<AvatarModel>(buildShopAvatar());
  const [activeCategory, setActiveCategory] = useState<AvatarCategory | null>(
    null,
  );
  const [leaveDrawerOpen, setLeaveDrawerOpen] = useState(false);

  useEffect(() => {
    if (!settings) {
      return;
    }

    const initialAvatar = buildShopAvatar(settings.avatar ?? undefined);
    setBaseAvatar(initialAvatar);
    setDraftAvatar(initialAvatar);
  }, [settings]);

  const boughtAvatarItems = useMemo(
    () => ownedShopItems.filter((item) => item.image.avatar),
    [ownedShopItems],
  );

  const categories = useMemo(
    () => collectAvatarCategories(boughtAvatarItems, draftAvatar),
    [boughtAvatarItems, draftAvatar],
  );

  const hasUnsavedChanges =
    serializeAvatar(baseAvatar) !== serializeAvatar(draftAvatar);

  const navigateBack = () => {
    router.back();
  };

  const handleLeave = () => {
    if (!hasUnsavedChanges) {
      navigateBack();
      return;
    }

    setLeaveDrawerOpen(true);
  };

  const handleSave = async () => {
    const optimisticSettings = {
      ...(settings ?? {
        username: "",
        name: "",
        dailyGoal: 0,
        themeMode: 0,
        notificationPreferences: {
          dailyPractice: true,
          streakFreezeUsed: false,
          leaderboardStatus: false,
          newFollower: true,
          friendActivity: false,
        },
      }),
      avatar: draftAvatar,
    };

    await mutate(async () => {
      await SettingsService.updateSettings({ avatar: draftAvatar });
      setBaseAvatar(draftAvatar);
      return optimisticSettings;
    }, optimisticMutationOption(optimisticSettings));

    navigateBack();
  };

  return (
    <PageRoot data-test="edit-avatar-page">
      <PageNavigation
        topNavigation={
          <BasicNavbar
            leftButton={{
              icon: "close",
              onClick: handleLeave,
              dataTest: "leave-button",
            }}
            rightButton={{
              text: t("userActions.save").toUpperCase(),
              onClick: handleSave,
              dataTest: "save-avatar-button",
            }}
          />
        }
        mainNavigation="hidden"
      />

      <ContentContainer width="small" justifyContent="flex-start" spacing={6}>
        <Stack
          sx={{ width: "100%", alignItems: "center" }}
          data-test="avatar-preview-section"
          data-avatar-definition={serializeAvatar(draftAvatar)}
          data-avatar-updated={hasUnsavedChanges ? "true" : "false"}
        >
          <Avatar definition={draftAvatar} size={180} />
        </Stack>

        <Stack spacing={2} width="100%" data-test="item-categories-section">
          <Header variant="section" text={t("avatarEditor.title")} />

          <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
            {categories.map((category) => {
              const preview = buildCategoryPreview(category, draftAvatar);

              return (
                <Stack key={category.id} spacing={1}>
                  <AvatarEditorItemButton
                    preview={preview}
                    onClick={() => setActiveCategory(category)}
                    data-test="item-category"
                  />
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </ContentContainer>

      <AvatarCategoryDialog
        open={Boolean(activeCategory)}
        onClose={() => setActiveCategory(null)}
        onBack={() => setActiveCategory(null)}
        category={activeCategory ?? undefined}
        draftAvatar={draftAvatar}
        onSelectOption={(field, value) => {
          setDraftAvatar((prev) => ({ ...prev, [field]: value }));
        }}
      />

      <LeaveAvatarEditorDrawer
        open={leaveDrawerOpen}
        onClose={() => setLeaveDrawerOpen(false)}
        onKeepEditing={() => setLeaveDrawerOpen(false)}
        onDiscardChanges={navigateBack}
      />
    </PageRoot>
  );
};

export default EditAvatarPage;
