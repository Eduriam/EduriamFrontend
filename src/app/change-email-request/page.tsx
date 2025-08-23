"use client";

import { useTranslation } from "i18n/client";
import theme from "styles/theme";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";

import ChangeEmailForm from "components/molecules/ChangeEmailForm/ChangeEmailForm";

export interface IChangeEmailRequestPage {}

const ChangeEmailRequestPage: React.FC<IChangeEmailRequestPage> = () => {
  const [emailSent, setEmailSent] = useState(false);
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const { t } = useTranslation("form");
  const router = useRouter();

  return (
    <Container maxWidth="xs" sx={{ pt: 3 }}>
      <Box>
        {emailSent === false ? (
          <>
            {desktop ? (
              <Card sx={{ textAlign: "center" }}>
                <ChangeEmailForm onEmailSent={() => setEmailSent(true)} />
              </Card>
            ) : (
              <ChangeEmailForm onEmailSent={() => setEmailSent(true)} />
            )}
          </>
        ) : (
          <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h3">
                  {t("changeEmail.emailSent")}
                </Typography>
                <Typography variant="body2">
                  {t("changeEmail.emailSentDescription")}
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={() => router.push("/")}
                sx={{ justifySelf: "center" }}
              >
                {t("changeEmail.continue")}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default ChangeEmailRequestPage;
