"use client";

import { ContentContainer, LargeButton, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";

import { useEffect, useMemo, useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Box, CircularProgress, Stack, Typography } from "@mui/material";

import errorCodes from "infrastructure/api/error-codes";
import { SignupService } from "infrastructure/services/auth/SignupService";

export interface IVerifyEmailPage {}

type VerificationStatus = "loading" | "success" | "error" | "expired";
type ResendStatus = "idle" | "loading" | "success" | "error";

const isExpiredConfirmationTokenError = (error: unknown): boolean => {
  if (error === errorCodes.emailConfirmationTokenExpired) {
    return true;
  }

  if (typeof error !== "object" || error === null) {
    return false;
  }

  const errorRecord = error as Record<string, unknown>;
  const response = errorRecord.response;

  if (typeof response !== "object" || response === null) {
    return false;
  }

  const responseRecord = response as Record<string, unknown>;
  const data = responseRecord.data;

  if (typeof data !== "object" || data === null) {
    return false;
  }

  const dataRecord = data as Record<string, unknown>;
  return dataRecord.code === errorCodes.emailConfirmationTokenExpired;
};

const VerifyEmailPage: React.FC<IVerifyEmailPage> = () => {
  const { t } = useTranslation("form");
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const searchParams = useSearchParams();
  const confirmationToken =
    searchParams?.get("confirmationToken") ?? searchParams?.get("token");
  const userIdParam = searchParams?.get("userId");
  const hasRequestedVerification = useRef(false);
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("loading");
  const [resendStatus, setResendStatus] = useState<ResendStatus>("idle");

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
    if (hasRequestedVerification.current) {
      return;
    }

    if (!confirmationToken || userId === null) {
      hasRequestedVerification.current = true;
      return;
    }

    hasRequestedVerification.current = true;

    const confirmSignup = async () => {
      try {
        await SignupService.confirmSignup({
          userId,
          confirmationToken,
        });
        setVerificationStatus("success");
      } catch (error) {
        if (isExpiredConfirmationTokenError(error)) {
          setVerificationStatus("expired");
          return;
        }

        setVerificationStatus("error");
      }
    };

    void confirmSignup();
  }, [confirmationToken, userId]);

  const handleResendConfirmation = async () => {
    if (userId === null || resendStatus === "loading" || resendStatus === "success") {
      return;
    }

    setResendStatus("loading");

    try {
      await SignupService.resendSignupConfirmation({
        userId,
      });
      setResendStatus("success");
      enqueueSnackbar(t("verifyEmail.resendSuccess"), { variant: "success" });
    } catch (error) {
      setResendStatus("error");
      enqueueSnackbar(t("verifyEmail.resendError"), { variant: "error" });
    }
  };

  const invalidLinkSection = (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Typography variant="body1">{t("verifyEmail.invalidLink")}</Typography>

      <LargeButton variant="contained" onClick={() => router.push("/signin")}>
        {t("verifyEmail.backToSignin")}
      </LargeButton>
    </Box>
  );

  const expiredTokenSection = (
    <>
      <Stack spacing={2}>
        <Typography variant="h3">{t("verifyEmail.expiredTitle")}</Typography>
        <Typography variant="body1">
          {t("verifyEmail.expiredDescription")}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <LargeButton
          variant="contained"
          onClick={() => {
            void handleResendConfirmation();
          }}
          disabled={resendStatus === "loading" || resendStatus === "success"}
        >
          {t("verifyEmail.resendButton")}
        </LargeButton>

        <LargeButton variant="outlined" onClick={() => router.push("/signin")}>
          {t("verifyEmail.backToSignin")}
        </LargeButton>
      </Stack>
    </>
  );

  return (
    <PageRoot>
      <ContentContainer
        width="small"
        justifyContent="space-between"
        paddingBottom="medium"
      >
        {confirmationToken && userId !== null ? (
          <>
            {verificationStatus === "success" ? (
              <>
                <Stack spacing={2}>
                  <Typography variant="h3">
                    {t("verifyEmail.emailVerified")}
                  </Typography>
                  <Typography variant="body1">
                    {t("verifyEmail.emailVerifiedDescription")}
                  </Typography>
                </Stack>

                <LargeButton
                  variant="contained"
                  onClick={() => router.push("/signin")}
                >
                  {t("verifyEmail.continue")}
                </LargeButton>
              </>
            ) : verificationStatus === "loading" ? (
              <CircularProgress />
            ) : verificationStatus === "expired" ? (
              expiredTokenSection
            ) : (
              invalidLinkSection
            )}
          </>
        ) : (
          invalidLinkSection
        )}
      </ContentContainer>
    </PageRoot>
  );
};

export default VerifyEmailPage;
