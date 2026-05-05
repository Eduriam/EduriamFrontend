"use client";

import { useTranslation } from "i18n/client";

import { useEffect, useMemo, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import { ChangeEmailService } from "infrastructure/services/auth/ChangeEmailService";

export interface IChangeEmailPage {}

const ChangeEmailPage: React.FC<IChangeEmailPage> = () => {
  const { t } = useTranslation("form");
  const router = useRouter();

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
    <Container maxWidth="xs" sx={{ pt: 3 }}>
      {token && userId !== null && newEmail ? (
        <>
          {emailChanged === true ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h3">
                  {t("changeEmail.emailChanged")}
                </Typography>
                <Typography variant="body2">
                  {t("changeEmail.emailChangedDescription")}
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={() => router.push("/signout")}
                sx={{ justifySelf: "center" }}
              >
                {t("changeEmail.signin")}
              </Button>
            </Box>
          ) : (
            <CircularProgress />
          )}
        </>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Typography variant="body2">{t("changeEmail.invalidData")}</Typography>

          <Button
            variant="contained"
            onClick={() => router.push("/settings")}
            sx={{ justifySelf: "center" }}
          >
            {t("changeEmail.backToSettings")}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ChangeEmailPage;
