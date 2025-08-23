"use client";

import { useTranslation } from "i18n/client";
import theme from "styles/theme";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import ChangePasswordForm from "components/molecules/ChangePasswordForm/ChangePasswordForm";

export interface IChangePasswordPage {}

const ChangePasswordPage: React.FC<IChangePasswordPage> = () => {
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const { t } = useTranslation("form");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const resetToken = searchParams?.get("resetToken");
  const email = searchParams?.get("email");

  return (
    <Container maxWidth="xs" sx={{ pt: 3 }}>
      <Box>
        {passwordChanged === false && resetToken && email ? (
          <>
            {desktop ? (
              <Card sx={{ textAlign: "center" }}>
                <ChangePasswordForm
                  onPasswordChanged={() => setPasswordChanged(true)}
                  resetToken={resetToken}
                  email={email}
                />
              </Card>
            ) : (
              <ChangePasswordForm
                onPasswordChanged={() => setPasswordChanged(true)}
                resetToken={resetToken}
                email={email}
              />
            )}
          </>
        ) : (
          <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Typography variant="h3">
                {t("changePassword.passwordChanged")}
              </Typography>

              <Button
                variant="contained"
                onClick={() => router.push("/login")}
                sx={{ justifySelf: "center" }}
              >
                {t("changePassword.login")}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default ChangePasswordPage;
