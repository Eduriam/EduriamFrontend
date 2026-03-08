"use client";

import {
  BasicNavbar,
  ContentContainer,
  DrawerSelect,
  PageRoot,
  Select,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useMemo, useState } from "react";

import Stack from "@mui/material/Stack";

import { optimisticMutationOption } from "infrastructure/api/API";
import type { ThemeMode } from "infrastructure/api/user/settings/Settings";
import SettingsAPI from "infrastructure/api/user/settings/SettingsAPI";
import { useThemeMode } from "infrastructure/services/ThemeModeProvider";

const SettingsPreferencesPage: React.FC = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
  const { enqueueSnackbar } = useSnackbar();

  const { settings, mutate } = SettingsAPI.useSettings();
  const { mode, setMode } = useThemeMode();

  const [isThemeModeDrawerOpen, setIsThemeModeDrawerOpen] = useState(false);

  const selectedMode = settings?.themeMode ?? mode ?? "system";

  const themeModeOptions: Array<{ value: ThemeMode; dataTest: string }> =
    useMemo(
      () => [
        {
          value: "system",
          dataTest: "appearance-mode-system-option-button",
        },
        {
          value: "dark",
          dataTest: "appearance-mode-dark-option-button",
        },
        {
          value: "light",
          dataTest: "appearance-mode-light-option-button",
        },
      ],
      [],
    );
  const themeModeSections = useMemo(
    () => [
      {
        id: "appearance-mode",
        title: t("settings.preferences.mode"),
        dataTest: "appearance-mode-select-section",
        options: themeModeOptions.map((option) => ({
          id: option.value,
          label: t(`settings.preferences.themeModes.${option.value}`),
          dataTest: option.dataTest,
        })),
      },
    ],
    [themeModeOptions, t],
  );

  const handleThemeModeChange = async (nextMode: ThemeMode) => {
    if (!settings) {
      setMode(nextMode);
      return;
    }

    const optimisticSettings = {
      ...settings,
      themeMode: nextMode,
    };

    setMode(nextMode);

    await mutate(async () => {
      const updatedSettings = await SettingsAPI.updateSettings({
        themeMode: nextMode,
      });

      enqueueSnackbar(t("settings.saved"), { variant: "success" });
      return updatedSettings;
    }, optimisticMutationOption(optimisticSettings));
  };

  return (
    <PageRoot data-test="preferences-page">
      <BasicNavbar
        header={t("settings.items.preferences")}
        leftButton={{
          icon: "arrowLeft",
          onClick: navigateWithTransition("/settings", { direction: "back" }),
        }}
      />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="none"
      >
        <Stack spacing={1} width="100%">
          <Select
            label={t("settings.preferences.mode")}
            value={t(`settings.preferences.themeModes.${selectedMode}`)}
            data-test="appearance-mode-select-button"
            onClick={() => setIsThemeModeDrawerOpen(true)}
            fullWidth
          />
        </Stack>
      </ContentContainer>

      <DrawerSelect
        open={isThemeModeDrawerOpen}
        onClose={() => setIsThemeModeDrawerOpen(false)}
        sections={themeModeSections}
        selectedOptionId={selectedMode}
        onChange={({ optionId }) => {
          void handleThemeModeChange(optionId as ThemeMode);
          setIsThemeModeDrawerOpen(false);
        }}
        data-test="appearance-mode-select-drawer"
      />
    </PageRoot>
  );
};

export default SettingsPreferencesPage;
