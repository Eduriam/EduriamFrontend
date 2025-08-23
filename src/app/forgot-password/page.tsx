"use client";

import { useTranslation } from "i18n/client";
import theme from "styles/theme";

import { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import ForgotPasswordForm from "components/molecules/ForgotPasswordForm/ForgotPasswordForm";

export interface IForgotPasswordPage {}

const ForgotPasswordPage: React.FC<IForgotPasswordPage> = () => {
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const { t } = useTranslation("form");
  const [emailSent, setEmailSent] = useState(false);

  return (
    <Container maxWidth="xs" sx={{ pt: 3 }}>
      <Box>
        {emailSent === false ? (
          <>
            {desktop ? (
              <Card sx={{ textAlign: "center" }}>
                <ForgotPasswordForm onEmailSent={() => setEmailSent(true)} />
              </Card>
            ) : (
              <ForgotPasswordForm onEmailSent={() => setEmailSent(true)} />
            )}
          </>
        ) : (
          <>
            <Typography variant="h3">
              {t("forgotPassword.passwordSent")}
            </Typography>
            <Typography variant="body2">
              {t("forgotPassword.passwordSentDescription")}
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
