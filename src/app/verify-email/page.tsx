"use client";

import { useTranslation } from "i18n/client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import { SignupService } from "infrastructure/services/auth/SignupService";

export interface IVerifyEmailPage {}

const VerifyEmailPage: React.FC<IVerifyEmailPage> = () => {
  const { t } = useTranslation("form");
  const router = useRouter();
  const searchParams = useSearchParams();
  const confirmationToken =
    searchParams?.get("confirmationToken") ?? searchParams?.get("token");
  const userIdParam = searchParams?.get("userId");
  const hasRequestedVerification = useRef(false);
  const [isVerified, setIsVerified] = useState(false);

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
        setIsVerified(true);
      } catch (error) {
        setIsVerified(false);
      }
    };

    void confirmSignup();
  }, [confirmationToken, userId]);

  return (
    <Container maxWidth="xs" sx={{ pt: 3 }}>
      {confirmationToken && userId !== null ? (
        <>
          {isVerified ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "70vh",
                gap: 10,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h3">{t("verifyEmail.emailVerified")}</Typography>
                <Typography variant="body2">
                  {t("verifyEmail.emailVerifiedDescription")}
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={() => router.push("/signin")}
                sx={{ justifySelf: "center" }}
              >
                {t("verifyEmail.continue")}
              </Button>
            </Box>
          ) : (
            <CircularProgress />
          )}
        </>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Typography variant="body2">{t("verifyEmail.invalidLink")}</Typography>

          <Button
            variant="contained"
            onClick={() => router.push("/signin")}
            sx={{ justifySelf: "center" }}
          >
            {t("verifyEmail.backToSignin")}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default VerifyEmailPage;
