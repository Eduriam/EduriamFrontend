"use client";

import { useTranslation } from "i18n/client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import ChangeEmailConfirmAPI from "infrastructure/api/user-auth/change-email-confirm/ChangeEmailConfirmAPI";

export interface IChangeEmailPage {}

const ChangeEmailPage: React.FC<IChangeEmailPage> = () => {
  const { t } = useTranslation("form");
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const oldEmail = searchParams?.get("oldEmail");
  const newEmail = searchParams?.get("newEmail");
  const [emailChanged, setEmailChanged] = useState(false);

  useEffect(() => {
    const confirmEmailChange = async (
      token: string,
      oldEmail: string,
      newEmail: string,
    ) => {
      await ChangeEmailConfirmAPI.confirmEmailChange({
        token,
        oldEmail,
        newEmail,
      });
    };

    if (!emailChanged && token && oldEmail && newEmail) {
      confirmEmailChange(token, oldEmail, newEmail);
      setEmailChanged(true);
    }
  }, [token, oldEmail, newEmail, emailChanged, setEmailChanged]);

  return (
    <Container maxWidth="xs" sx={{ pt: 3 }}>
      {token && oldEmail && newEmail ? (
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
                onClick={() => router.push("/logout")}
                sx={{ justifySelf: "center" }}
              >
                {t("changeEmail.login")}
              </Button>
            </Box>
          ) : (
            <CircularProgress />
          )}
        </>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Typography variant="body2">
            {t("changeEmail.invalidData")}
          </Typography>

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
