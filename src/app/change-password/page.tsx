"use client";

import { Header, LargeButton } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ChangePasswordForm from "components/molecules/ChangePasswordForm/ChangePasswordForm";

export interface IChangePasswordPage {}

const ChangePasswordPage: React.FC<IChangePasswordPage> = () => {
  const { t } = useTranslation("form");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const resetToken = searchParams?.get("resetToken");
  const email = searchParams?.get("email");

  return (
    <Box sx={{ backgroundColor: "common.white", minHeight: "100svh" }}>
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
        {passwordChanged ? (
          <>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Header
                  level="title"
                  text={t("changePassword.passwordChanged")}
                  sx={{ color: "common.black", textAlign: "left" }}
                />
                <Typography
                  variant="body1"
                  sx={{ color: "#989898", textAlign: "left" }}
                >
                  {t("changePassword.passwordChangedDescription")}
                </Typography>
              </Box>
              <LargeButton
                variant="contained"
                onClick={() => router.push("/login")}
                fullWidth
              >
                {t("changePassword.login")}
              </LargeButton>
            </Box>
          </>
        ) : resetToken && email ? (
          <>
            <ChangePasswordForm
              onPasswordChanged={() => setPasswordChanged(true)}
              resetToken={resetToken}
              email={email}
            />
          </>
        ) : (
          <>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Header
                  level="title"
                  text={t("changePassword.invalidLink")}
                  sx={{ color: "common.black", textAlign: "left" }}
                />
                <Typography
                  variant="body1"
                  sx={{ color: "#989898", textAlign: "left" }}
                >
                  {t("changePassword.invalidLinkDescription")}
                </Typography>
              </Box>
              <LargeButton
                variant="contained"
                onClick={() => router.push("/login")}
                fullWidth
              >
                {t("changePassword.login")}
              </LargeButton>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ChangePasswordPage;
