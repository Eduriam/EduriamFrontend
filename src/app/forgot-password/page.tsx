"use client";

import { Header } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import BackNavigationBar from "components/atoms/navigation/top-navigation-bars/BackNavigationBar/BackNavigationBar";
import ForgotPasswordForm from "components/molecules/ForgotPasswordForm/ForgotPasswordForm";

export interface IForgotPasswordPage {}

const ForgotPasswordPage: React.FC<IForgotPasswordPage> = () => {
  const { t } = useTranslation("form");
  const [emailSent, setEmailSent] = useState(false);

  return (
    <Box sx={{ minHeight: "100svh" }}>
      <BackNavigationBar color="transparent" />
      <Container
        maxWidth="xs"
        sx={{
          minHeight: "100svh",
          px: "26px",
          pt: "104px",
          pb: "32px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {emailSent === false ? (
          <>
            <ForgotPasswordForm onEmailSent={() => setEmailSent(true)} />
          </>
        ) : (
          <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Header
                level="title"
                text={t("forgotPassword.passwordSent")}
                sx={{ color: "common.black", textAlign: "left" }}
              />
              <Typography
                variant="body1"
                sx={{ color: "#989898", textAlign: "left" }}
              >
                {t("forgotPassword.passwordSentDescription")}
              </Typography>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;
