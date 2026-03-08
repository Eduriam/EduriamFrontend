"use client";

import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { BasicNavbar, Header, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ForgotPasswordForm from "components/molecules/ForgotPasswordForm/ForgotPasswordForm";

export interface IForgotPasswordPage {}

const ForgotPasswordPage: React.FC<IForgotPasswordPage> = () => {
  const { t } = useTranslation("form");
  const [emailSent, setEmailSent] = useState(false);
  const navigateWithTransition = useTransitionNavigationHandler();

  return (
    <PageRoot>
      <PageNavigation topNavigation={<BasicNavbar
        leftButton={{
          icon: "chevronLeft",
          onClick: navigateWithTransition("/login", {
            direction: "back",
          }),
        }}
      />} mainNavigation="hidden" />
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
