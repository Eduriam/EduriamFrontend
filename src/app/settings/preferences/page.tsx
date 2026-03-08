"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useMemo, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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
          <Typography variant="subtitle1">
            {t("settings.preferences.darkTheme")}
          </Typography>
          <Box
            role="button"
            tabIndex={0}
            data-test="appearance-mode-select-button"
            onClick={() => setIsThemeModeDrawerOpen(true)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setIsThemeModeDrawerOpen(true);
              }
            }}
            sx={{
              border: 1.5,
              borderColor: "divider",
              borderRadius: 3,
              px: 2,
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <Typography variant="body1">
              {t(`settings.preferences.themeModes.${selectedMode}`)}
            </Typography>
            <KeyboardArrowDownIcon />
          </Box>
        </Stack>
      </ContentContainer>

      <Drawer
        anchor="bottom"
        open={isThemeModeDrawerOpen}
        onClose={() => setIsThemeModeDrawerOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            p: 3,
          },
        }}
      >
        <Stack spacing={2} data-test="appearance-mode-select-drawer">
          <Typography variant="h6">
            {t("settings.preferences.darkTheme")}
          </Typography>

          {themeModeOptions.map((option) => (
            <Box
              key={option.value}
              role="button"
              tabIndex={0}
              data-test={option.dataTest}
              onClick={() => {
                void handleThemeModeChange(option.value);
                setIsThemeModeDrawerOpen(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  void handleThemeModeChange(option.value);
                  setIsThemeModeDrawerOpen(false);
                }
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                py: 1.5,
                cursor: "pointer",
              }}
            >
              <Typography variant="body1">
                {t(`settings.preferences.themeModes.${option.value}`)}
              </Typography>
              {selectedMode === option.value ? (
                <CheckIcon fontSize="small" />
              ) : null}
            </Box>
          ))}
        </Stack>
      </Drawer>
    </PageRoot>
  );
};

export default SettingsPreferencesPage;
