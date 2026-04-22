"use client";

import { Header, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ForgotPasswordForm from "components/molecules/ForgotPasswordForm/ForgotPasswordForm";
import BackNavbar from "components/navigation/BackNavbar/BackNavbar";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

export interface IForgotPasswordPage {}

const ForgotPasswordPage: React.FC<IForgotPasswordPage> = () => {
  const { t } = useTranslation("form");
  const [emailSent, setEmailSent] = useState(false);

  return (
    <PageRoot>
      <PageNavigation
        topNavigation={
          <BackNavbar withTransition route="/signin" />
        }
        mainNavigation="hidden"
      />
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
              <Header variant="title" text={t("forgotPassword.passwordSent")} />
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
    </PageRoot>
  );
};

export default ForgotPasswordPage;
