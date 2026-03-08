"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useEffect, useMemo, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Avatar from "components/avatar/Avatar";

import { optimisticMutationOption } from "infrastructure/api/API";
import errorCodes from "infrastructure/api/error-codes";
import ResetPasswordAPI from "infrastructure/api/reset-password/ResetPasswordAPI";
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
      <BasicNavbar
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
      />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="none"
      >
        <Stack spacing={3} width="100%">
          <Stack spacing={1} alignItems="center">
            <Stack data-test="settings-profile-avatar">
              <Avatar
                definition={settings?.avatarDefinition ?? {}}
                size={100}
              />
            </Stack>
            <Button
              variant="text"
              onClick={navigateWithTransition("/edit-avatar")}
              data-test="settings-profile-change-avatar-button"
            >
              {t("settings.profile.changeAvatar")}
            </Button>
          </Stack>

          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography variant="subtitle1">
                {t("settings.profile.name")}
              </Typography>
              <TextField
                value={draft.name}
                onChange={(event) =>
                  setDraft((currentDraft) => ({
                    ...currentDraft,
                    name: event.target.value,
                  }))
                }
                inputProps={{ "data-test": "settings-profile-name-field" }}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1">
                {t("settings.profile.username")}
              </Typography>
              <TextField
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
              />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1">
                {t("settings.profile.email")}
              </Typography>
              <TextField
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
              />
            </Stack>
          </Stack>

          <Button
            variant="outlined"
            onClick={async () => {
              await ResetPasswordAPI.resetPassword({ email: draft.email });
              enqueueSnackbar(t("settings.profile.passwordResetSent"), {
                variant: "success",
              });
            }}
            data-test="settings-profile-change-password-button"
          >
            {t("settings.profile.changePassword")}
          </Button>
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default SettingsProfilePage;
