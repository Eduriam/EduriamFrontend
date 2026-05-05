"use client";

import {
  ContentContainer,
  Header,
  LargeButton,
  PageRoot,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useMemo, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ChangePasswordForm from "components/molecules/ChangePasswordForm/ChangePasswordForm";

export interface IChangePasswordPage {}

const ChangePasswordPage: React.FC<IChangePasswordPage> = () => {
  const { t } = useTranslation("form");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const resetToken = searchParams?.get("resetToken");
  const userIdParam = searchParams?.get("userId");

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

  return (
    <PageRoot>
      <ContentContainer width="small" justifyContent="center">
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
                  variant="title"
                  text={t("changePassword.passwordChanged")}
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
                onClick={() => router.push("/signin")}
                fullWidth
              >
                {t("changePassword.signin")}
              </LargeButton>
            </Box>
          </>
        ) : resetToken && userId !== null ? (
          <>
            <ChangePasswordForm
              onPasswordChanged={() => setPasswordChanged(true)}
              resetToken={resetToken}
              userId={userId}
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
                  variant="title"
                  text={t("changePassword.invalidLink")}
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
                onClick={() => router.push("/signin")}
                fullWidth
              >
                {t("changePassword.signin")}
              </LargeButton>
            </Box>
          </>
        )}
      </ContentContainer>
    </PageRoot>
  );
};

export default ChangePasswordPage;
