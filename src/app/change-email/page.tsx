"use client";

import {
  ContentContainer,
  Header,
  LargeButton,
  PageRoot,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "next/navigation";

import { Box, CircularProgress, Typography } from "@mui/material";

import { ChangeEmailService } from "infrastructure/services/auth/ChangeEmailService";

export interface IChangeEmailPage {}

const ChangeEmailPage: React.FC<IChangeEmailPage> = () => {
  const { t } = useTranslation("form");
  const navigateWithTransition = useTransitionNavigationHandler();

  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const userIdParam = searchParams?.get("userId");
  const newEmail = searchParams?.get("newEmail");
  const [emailChanged, setEmailChanged] = useState(false);

  const userId = useMemo(() => {
    if (!userIdParam) {
      return null;
    }

    const parsedUserId = Number(userIdParam);
    if (Number.isNaN(parsedUserId)) {
      return null;
    }

    return parsedUserId;
  }, [userIdParam]);

  useEffect(() => {
    const confirmEmailChange = async (
      token: string,
      userId: number,
      newEmail: string,
    ) => {
      await ChangeEmailService.confirmEmailChange({
        token,
        userId,
        newEmail,
      });
    };

    if (!emailChanged && token && userId !== null && newEmail) {
      void confirmEmailChange(token, userId, newEmail);
      setEmailChanged(true);
    }
  }, [token, userId, newEmail, emailChanged, setEmailChanged]);

  return (
    <PageRoot data-test="change-email-page">
      <ContentContainer
        paddingTop="large"
        width="small"
        justifyContent="space-between"
        paddingBottom="medium"
      >
        {token && userId !== null && newEmail ? (
          <>
            {emailChanged === true ? (
              <>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Header
                    variant="title"
                    text={t("changeEmail.emailChanged")}
                  />
                  <Typography variant="subtitle1">
                    {t("changeEmail.emailChangedDescription")}
                  </Typography>
                </Box>

                <LargeButton
                  variant="contained"
                  onClick={navigateWithTransition("/signout")}
                  fullWidth
                >
                  {t("changeEmail.signin")}
                </LargeButton>
              </>
            ) : (
              <CircularProgress />
            )}
          </>
        ) : (
          <>
            <Typography variant="subtitle1">
              {t("changeEmail.invalidData")}
            </Typography>

            <LargeButton
              variant="contained"
              onClick={navigateWithTransition("/settings", {
                direction: "back",
              })}
              fullWidth
            >
              {t("changeEmail.backToSettings")}
            </LargeButton>
          </>
        )}
      </ContentContainer>
    </PageRoot>
  );
};

export default ChangeEmailPage;
