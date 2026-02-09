"use client";

import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import BottomFab from "components/atoms/BottomFab/BottomFab";
import AccountSettings from "components/molecules/settings/AccountSettings/AccountSettings";
import DailyGoalSettings from "components/molecules/settings/DailyGoalSettings/DailyGoalSettings";

import { optimisticMutationOption } from "infrastructure/api/API";
import errorCodes from "infrastructure/api/error-codes";
import SettingsAPI from "infrastructure/api/user/settings/SettingsAPI";
import useAuth from "infrastructure/services/AuthProvider";

export interface ISettingsPage {}

const SettingsPage: React.FC<ISettingsPage> = () => {
  const { t } = useTranslation("form");
  const { user, revalidateUser } = useAuth();
  const router = useRouter();
  const { settings, mutate } = SettingsAPI.useSettings(user?.id);
  const [errors, setErrors] = useState<Array<string>>([]);
  const [change, setChange] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [changePasswordEmailSent, setChangePasswordEmailSent] = useState(false);

  function handleSave() {
    mutate(
      async () => {
        try {
          const newSettings = await SettingsAPI.updateSettings({
            ...change,
          });

          enqueueSnackbar(t("settings.saved"), {
            variant: "success",
          });

          setErrors([]);
          setChange({});
          revalidateUser();
          return newSettings;
        } catch (err) {
          handleError(err);
          return { ...settings, ...change };
        }
      },
      optimisticMutationOption({ ...settings, ...change }),
    );
  }

  function handleError(error: unknown) {
    switch (error) {
      case errorCodes.usernameTaken:
        setErrors((errors) => [...errors, errorCodes.usernameTaken]);
        break;
      case errorCodes.emailAddressTaken:
        setErrors((errors) => [...errors, errorCodes.emailAddressTaken]);
        break;
      default:
        enqueueSnackbar(t("general-error-message"), {
          variant: "error",
        });
        break;
    }
  }

  function displaySaveButton() {
    if (Object.keys(change).length !== 0) {
      return true;
    }

    return false;
  }

  return (
    <>
      {changePasswordEmailSent === true ? (
        <Container maxWidth="xs" sx={{ pt: 3 }}>
          <Typography variant="h3">
            {t("forgotPassword.passwordSent")}
          </Typography>
          <Typography variant="body2">
            {t("forgotPassword.passwordSentDescription")}
          </Typography>
        </Container>
      ) : (
        <>
          {settings && (
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              sx={{ width: "100%", mb: 4 }}
            >
              <AccountSettings
                username={settings.username}
                name={settings.name}
                email={settings.email}
                onUsernameChange={(value) =>
                  setChange({ ...change, username: value })
                }
                onNameChange={(value) => setChange({ ...change, name: value })}
                onPasswordChange={() => setChangePasswordEmailSent(true)}
                accountErrors={errors}
              />
              <Box display="flex" flexDirection="column" gap={2} width="100%">
                <Typography variant="subtitle1">
                  {t("settings.courseCustomization")}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => router.push(`/topic-selection`)}
                  sx={{ width: "50%", alignSelf: "center" }}
                >
                  {t("settings.customizeTopics")}
                </Button>
              </Box>
              <DailyGoalSettings
                dailyGoal={settings.dailyGoal}
                onGoalChange={(value) =>
                  setChange({ ...change, dailyGoal: value })
                }
              />
              <Box display="flex" flexDirection="column" gap={2} width="100%">
                <Typography variant="subtitle1">
                  {t("settings.premium")}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => router.push("/manage-subscription")}
                  sx={{ width: "50%", alignSelf: "center" }}
                >
                  {t("settings.manageSubscription")}
                </Button>
              </Box>
            </Box>
          )}

          {displaySaveButton() && (
            <BottomFab
              header={t("userActions.save")}
              icon="check"
              onClick={() => handleSave()}
            />
          )}
        </>
      )}
    </>
  );
};

export default SettingsPage;
