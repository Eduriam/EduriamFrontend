"use client";

import {
  BasicNavbar,
  ContentContainer,
  LargeButton,
  PageRoot,
  TextField,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useEffect, useMemo, useState } from "react";

import Stack from "@mui/material/Stack";

import Avatar from "components/avatar/Avatar";

import { optimisticMutationOption } from "infrastructure/api/API";
import errorCodes from "infrastructure/api/error-codes";
import ResetPasswordAPI from "infrastructure/api/reset-password/ResetPasswordAPI";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";
import SettingsAPI from "infrastructure/api/user/settings/SettingsAPI";

type ProfileDraft = {
  name: string;
  username: string;
  email: string;
};

const SettingsProfilePage: React.FC = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
  const { enqueueSnackbar } = useSnackbar();

  const { settings, mutate } = SettingsAPI.useSettings();

  const [draft, setDraft] = useState<ProfileDraft>({
    name: "",
    username: "",
    email: "",
  });
  const [errors, setErrors] = useState<Array<string>>([]);

  useEffect(() => {
    if (!settings) {
      return;
    }

    setDraft({
      name: settings.name,
      username: settings.username,
      email: settings.email,
    });
  }, [settings]);

  const hasUnsavedChanges = useMemo(() => {
    if (!settings) {
      return false;
    }

    return (
      draft.name !== settings.name ||
      draft.username !== settings.username ||
      draft.email !== settings.email
    );
  }, [draft, settings]);

  const handleSave = async () => {
    if (!settings || !hasUnsavedChanges) {
      return;
    }

    const optimisticSettings = {
      ...settings,
      ...draft,
    };

    try {
      await mutate(async () => {
        const updatedSettings = await SettingsAPI.updateSettings(draft);
        enqueueSnackbar(t("settings.saved"), { variant: "success" });
        setErrors([]);
        return updatedSettings;
      }, optimisticMutationOption(optimisticSettings));
    } catch (error) {
      if (error === errorCodes.usernameTaken) {
        setErrors([errorCodes.usernameTaken]);
      } else if (error === errorCodes.emailAddressTaken) {
        setErrors([errorCodes.emailAddressTaken]);
      } else {
        enqueueSnackbar(t("settings.generalError"), { variant: "error" });
      }
    }
  };

  return (
    <PageRoot data-test="settings-profile-page">
      <PageNavigation topNavigation={<BasicNavbar
        header={t("settings.items.profile")}
        leftButton={{
          icon: "close",
          onClick: navigateWithTransition("/settings", { direction: "back" }),
        }}
        rightButton={{
          text: t("userActions.save").toUpperCase(),
          onClick: () => {
            if (hasUnsavedChanges) {
              void handleSave();
            }
          },
          dataTest: "settings-profile-save-button",
        }}
      />} mainNavigation="hidden" />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="none"
        spacing={10}
      >
        <Stack spacing={6}>
          <Stack spacing={1} alignItems="center">
            <Stack
              data-test="settings-profile-avatar"
              role="button"
              tabIndex={0}
              onClick={navigateWithTransition("/edit-avatar")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigateWithTransition("/edit-avatar")();
                }
              }}
              sx={{ cursor: "pointer" }}
            >
              <Avatar
                definition={settings?.avatarDefinition ?? {}}
                size={100}
              />
            </Stack>
            <LargeButton
              variant="text"
              onClick={navigateWithTransition("/edit-avatar")}
              data-test="settings-profile-change-avatar-button"
            >
              {t("settings.profile.changeAvatar")}
            </LargeButton>
          </Stack>

          <TextField
            label={t("settings.profile.name")}
            value={draft.name}
            onChange={(event) =>
              setDraft((currentDraft) => ({
                ...currentDraft,
                name: event.target.value,
              }))
            }
            inputProps={{ "data-test": "settings-profile-name-field" }}
            fullWidth
          />

          <TextField
            label={t("settings.profile.username")}
            value={draft.username}
            error={errors.includes(errorCodes.usernameTaken)}
            helperText={
              errors.includes(errorCodes.usernameTaken)
                ? t("settings.profile.usernameTaken")
                : undefined
            }
            onChange={(event) =>
              setDraft((currentDraft) => ({
                ...currentDraft,
                username: event.target.value,
              }))
            }
            onFocus={() =>
              setErrors((currentErrors) =>
                currentErrors.filter(
                  (code) => code !== errorCodes.usernameTaken,
                ),
              )
            }
            inputProps={{ "data-test": "settings-profile-username-field" }}
            fullWidth
          />

          <TextField
            label={t("settings.profile.email")}
            type="email"
            value={draft.email}
            error={errors.includes(errorCodes.emailAddressTaken)}
            helperText={
              errors.includes(errorCodes.emailAddressTaken)
                ? t("settings.profile.emailTaken")
                : undefined
            }
            onChange={(event) =>
              setDraft((currentDraft) => ({
                ...currentDraft,
                email: event.target.value,
              }))
            }
            onFocus={() =>
              setErrors((currentErrors) =>
                currentErrors.filter(
                  (code) => code !== errorCodes.emailAddressTaken,
                ),
              )
            }
            inputProps={{ "data-test": "settings-profile-email-field" }}
            fullWidth
          />
        </Stack>

        <LargeButton
          variant="outlined"
          onClick={async () => {
            await ResetPasswordAPI.resetPassword({ email: draft.email });
            enqueueSnackbar(t("settings.profile.passwordResetSent"), {
              variant: "success",
            });
          }}
          data-test="settings-profile-change-password-button"
          fullWidth
        >
          {t("settings.profile.changePassword")}
        </LargeButton>
      </ContentContainer>
    </PageRoot>
  );
};

export default SettingsProfilePage;
