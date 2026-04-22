"use client";

import {
  ContentContainer,
  DrawerSelect,
  PageRoot,
  Select,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";

import { useMemo, useState } from "react";

import Stack from "@mui/material/Stack";

import BackNavbar from "components/navigation/BackNavbar/BackNavbar";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { optimisticMutationOption } from "infrastructure/api/API";
import type { ThemeMode } from "infrastructure/api/generated/models";
import { ThemeMode as ThemeModeValues } from "infrastructure/api/generated/models";
import { useThemeMode } from "infrastructure/services/ThemeModeProvider";
import { SettingsService } from "infrastructure/services/users/SettingsService";

const SettingsPreferencesPage: React.FC = () => {
  const { t } = useTranslation("common");
  const { enqueueSnackbar } = useSnackbar();

  const { settings, mutate } = SettingsService.useSettings();
  const { mode, setMode } = useThemeMode();

  const [isThemeModeDrawerOpen, setIsThemeModeDrawerOpen] = useState(false);

  const selectedMode = settings?.themeMode ?? mode ?? ThemeModeValues.System;

  const themeModeOptions: Array<{ value: ThemeMode; id: string; dataTest: string }> =
    useMemo(
      () => [
        {
          value: ThemeModeValues.System,
          id: String(ThemeModeValues.System),
          dataTest: "appearance-mode-system-option-button",
        },
        {
          value: ThemeModeValues.Dark,
          id: String(ThemeModeValues.Dark),
          dataTest: "appearance-mode-dark-option-button",
        },
        {
          value: ThemeModeValues.Light,
          id: String(ThemeModeValues.Light),
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
          id: option.id,
          label: t(
            `settings.preferences.themeModes.${
              option.value === ThemeModeValues.System
                ? "system"
                : option.value === ThemeModeValues.Dark
                  ? "dark"
                  : "light"
            }`,
          ),
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
      const updatedSettings = await SettingsService.updateSettings({
        theme: nextMode,
      });

      enqueueSnackbar(t("settings.saved"), { variant: "success" });
      return updatedSettings;
    }, optimisticMutationOption(optimisticSettings));
  };

  return (
    <PageRoot data-test="preferences-page">
      <PageNavigation
        topNavigation={
          <BackNavbar
            withTransition
            route="/settings"
            header={t("settings.items.preferences")}
          />
        }
        mainNavigation="hidden"
      />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="none"
      >
        <Stack spacing={1} width="100%">
          <Select
            label={t("settings.preferences.mode")}
            value={t(
              `settings.preferences.themeModes.${
                selectedMode === ThemeModeValues.System
                  ? "system"
                  : selectedMode === ThemeModeValues.Dark
                    ? "dark"
                    : "light"
              }`,
            )}
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
        selectedOptionId={String(selectedMode)}
        onChange={({ optionId }) => {
          const nextMode = Number(optionId) as ThemeMode;
          void handleThemeModeChange(nextMode);
          setIsThemeModeDrawerOpen(false);
        }}
        data-test="appearance-mode-select-drawer"
      />
    </PageRoot>
  );
};

export default SettingsPreferencesPage;
