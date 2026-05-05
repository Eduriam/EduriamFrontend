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

import { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";

import Avatar from "components/avatar/Avatar";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { optimisticMutationOption } from "infrastructure/api/API";
import { ApplicationProblemDetailsCode } from "infrastructure/api/generated/models";
import useAuth from "infrastructure/services/AuthProvider";
import { ChangeEmailService } from "infrastructure/services/auth/ChangeEmailService";
import { ResetPasswordService } from "infrastructure/services/auth/ResetPasswordService";
import { SettingsService } from "infrastructure/services/users/SettingsService";

type ProfileDraft = {
  name: string;
  username: string;
  email: string;
};

const SettingsProfilePage: React.FC = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();
  const { settings, mutate } = SettingsService.useSettings();
  const userEmail = user?.email ?? "";

  const [draft, setDraft] = useState<ProfileDraft>({
    name: "",
    username: "",
    email: "",
  });
  const [isEmailEdited, setIsEmailEdited] = useState(false);
  const [errors, setErrors] = useState<
    Array<
      | typeof ApplicationProblemDetailsCode.USERNAME_TAKEN
      | typeof ApplicationProblemDetailsCode.EMAIL_ADDRESS_TAKEN
    >
  >([]);

  useEffect(() => {
    if (!settings) {
      return;
    }

    setDraft({
      name: settings.name,
      username: settings.username,
      email: userEmail,
    });
    setIsEmailEdited(false);
  }, [settings, userEmail]);

  const handleSave = async () => {
    if (!settings) {
      return;
    }

    const isEmailChanged = isEmailEdited && draft.email !== userEmail;

    if (isEmailChanged) {
      try {
        await ChangeEmailService.changeEmail({ newEmail: draft.email });
        enqueueSnackbar(t("settings.profile.passwordResetSent"), {
          variant: "success",
        });
        setErrors([]);
        setDraft({
          name: settings.name,
          username: settings.username,
          email: userEmail,
        });
        setIsEmailEdited(false);
      } catch (error) {
        if (error === ApplicationProblemDetailsCode.EMAIL_ADDRESS_TAKEN) {
          setErrors([ApplicationProblemDetailsCode.EMAIL_ADDRESS_TAKEN]);
        } else {
          enqueueSnackbar(t("settings.generalError"), { variant: "error" });
        }
      }
      return;
    }

    const optimisticSettings = {
      ...settings,
      ...draft,
    };

    try {
      const updatedSettings = await SettingsService.updateSettings({
        name: draft.name,
        username: draft.username,
      });
      await mutate(updatedSettings, optimisticMutationOption(optimisticSettings));
      enqueueSnackbar(t("settings.saved"), { variant: "success" });
      setErrors([]);
    } catch (error) {
      if (error === ApplicationProblemDetailsCode.USERNAME_TAKEN) {
        setErrors([ApplicationProblemDetailsCode.USERNAME_TAKEN]);
      } else if (error === ApplicationProblemDetailsCode.EMAIL_ADDRESS_TAKEN) {
        setErrors([ApplicationProblemDetailsCode.EMAIL_ADDRESS_TAKEN]);
      } else {
        enqueueSnackbar(t("settings.generalError"), { variant: "error" });
      }
    }
  };

  return (
    <PageRoot data-test="settings-profile-page">
      <PageNavigation
        topNavigation={
          <BasicNavbar
            header={t("settings.items.profile")}
            leftButton={{
              icon: "close",
              onClick: navigateWithTransition("/settings", {
                direction: "back",
              }),
            }}
            rightButton={{
              text: t("userActions.save").toUpperCase(),
              onClick: () => {
                void handleSave();
              },
              dataTest: "settings-profile-save-button",
            }}
          />
        }
        mainNavigation="hidden"
      />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="none"
        spacing={10}
      >
        <Stack spacing={6}>
          <Stack spacing={1} alignItems="center">
            {settings && (
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
                <Avatar definition={settings.avatar} size={100} />
              </Stack>
            )}
            <LargeButton
              variant="text"
              onClick={navigateWithTransition("/edit-avatar")}
              data-test="settings-profile-change-avatar-button"
            >
              {t("settings.profile.changeAvatar")}
            </LargeButton>
          </Stack>

          <Stack data-test="settings-profile-name-field">
            <TextField
              data-test="settings-profile-name-field"
              label={t("settings.profile.name")}
              value={draft.name}
              onChange={(event) =>
                setDraft((currentDraft) => ({
                  ...currentDraft,
                  name: event.target.value,
                }))
              }
              fullWidth
            />
          </Stack>

          <Stack data-test="settings-profile-username-field">
            <TextField
              data-test="settings-profile-username-field"
              label={t("settings.profile.username")}
              value={draft.username}
              error={errors.includes(ApplicationProblemDetailsCode.USERNAME_TAKEN)}
              helperText={
                errors.includes(ApplicationProblemDetailsCode.USERNAME_TAKEN)
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
                    (code) => code !== ApplicationProblemDetailsCode.USERNAME_TAKEN,
                  ),
                )
              }
              fullWidth
            />
          </Stack>

          <Stack data-test="settings-profile-email-field">
            <TextField
              data-test="settings-profile-email-field"
              label={t("settings.profile.email")}
              type="email"
              value={draft.email}
              error={errors.includes(
                ApplicationProblemDetailsCode.EMAIL_ADDRESS_TAKEN,
              )}
              helperText={
                errors.includes(ApplicationProblemDetailsCode.EMAIL_ADDRESS_TAKEN)
                  ? t("settings.profile.emailTaken")
                  : undefined
              }
              onChange={(event) => {
                setIsEmailEdited(true);
                setDraft((currentDraft) => ({
                  ...currentDraft,
                  email: event.target.value,
                }));
              }}
              onFocus={() =>
                setErrors((currentErrors) =>
                  currentErrors.filter(
                    (code) =>
                      code !== ApplicationProblemDetailsCode.EMAIL_ADDRESS_TAKEN,
                  ),
                )
              }
              fullWidth
            />
          </Stack>
        </Stack>

        <LargeButton
          variant="outlined"
          onClick={async () => {
            await ResetPasswordService.resetPassword({ email: draft.email });
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
