"use client";

import {
  BasicNavbar,
  ContentContainer,
  PageRoot,
  Switch,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { optimisticMutationOption } from "infrastructure/api/API";
import type { NotificationPreferences } from "infrastructure/api/user/settings/Settings";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";
import SettingsAPI from "infrastructure/api/user/settings/SettingsAPI";

type NotificationSettingItem = {
  id: keyof NotificationPreferences;
  labelKey: string;
  dataTest: string;
};

const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  dailyPractice: true,
  streakFreezeUsed: false,
  leaderboardStatus: false,
  newFollower: true,
  friendActivity: false,
};

const SettingsNotificationsPage: React.FC = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
  const { enqueueSnackbar } = useSnackbar();

  const { settings, mutate } = SettingsAPI.useSettings();
  const [lastSavedPreference, setLastSavedPreference] = useState<
    keyof NotificationPreferences | null
  >(null);

  const notificationPreferences =
    settings?.notificationPreferences ?? DEFAULT_NOTIFICATION_PREFERENCES;

  const sections = useMemo(
    () => [
      {
        id: "learning-reminders",
        titleKey: "settings.notifications.sections.learningReminders",
        items: [
          {
            id: "dailyPractice",
            labelKey: "settings.notifications.items.dailyPractice",
            dataTest: "notification-settings-switch-button",
          },
          {
            id: "streakFreezeUsed",
            labelKey: "settings.notifications.items.streakFreezeUsed",
            dataTest: "notification-streak-freeze-switch-button",
          },
        ] as NotificationSettingItem[],
      },
      {
        id: "leaderboards",
        titleKey: "settings.notifications.sections.leaderboards",
        items: [
          {
            id: "leaderboardStatus",
            labelKey: "settings.notifications.items.leaderboardStatus",
            dataTest: "notification-leaderboard-status-switch-button",
          },
        ] as NotificationSettingItem[],
      },
      {
        id: "followers",
        titleKey: "settings.notifications.sections.followers",
        items: [
          {
            id: "newFollower",
            labelKey: "settings.notifications.items.newFollower",
            dataTest: "notification-new-follower-switch-button",
          },
          {
            id: "friendActivity",
            labelKey: "settings.notifications.items.friendActivity",
            dataTest: "notification-friend-activity-switch-button",
          },
        ] as NotificationSettingItem[],
      },
    ],
    [],
  );

  const handleToggle = async (
    preferenceKey: keyof NotificationPreferences,
    checked: boolean,
  ) => {
    if (!settings) {
      return;
    }

    const nextPreferences = {
      ...notificationPreferences,
      [preferenceKey]: checked,
    };

    const optimisticSettings = {
      ...settings,
      notificationPreferences: nextPreferences,
    };

    await mutate(async () => {
      const updatedSettings = await SettingsAPI.updateSettings({
        notificationPreferences: nextPreferences,
      });

      enqueueSnackbar(t("settings.saved"), { variant: "success" });
      setLastSavedPreference(preferenceKey);
      return updatedSettings;
    }, optimisticMutationOption(optimisticSettings));
  };

  return (
    <PageRoot data-test="notification-settings-page">
      <PageNavigation topNavigation={<BasicNavbar
        header={t("settings.items.notifications")}
        leftButton={{
          icon: "arrowLeft",
          onClick: navigateWithTransition("/settings", { direction: "back" }),
        }}
      />} mainNavigation="hidden" />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="small"
      >
        <Stack spacing={10} width="100%">
          {sections.map((section) => (
            <Stack key={section.id} spacing={4}>
              <Typography variant="h6">{t(section.titleKey)}</Typography>

              <Stack spacing={4}>
                {section.items.map((item) => (
                  <Box
                    key={item.id}
                    data-saved={
                      lastSavedPreference === item.id ? "true" : "false"
                    }
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      py: 1,
                    }}
                  >
                    <Typography variant="body1">{t(item.labelKey)}</Typography>
                    <Switch
                      data-test={item.dataTest}
                      checked={notificationPreferences[item.id]}
                      onChange={(checked) => {
                        void handleToggle(item.id, checked);
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default SettingsNotificationsPage;
