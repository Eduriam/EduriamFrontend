"use client";

import {
  ContentContainer,
  Header,
  Illustration,
  LargeButton,
  PageRoot,
} from "@eduriam/ui-core";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import useAuth from "infrastructure/services/AuthProvider";

export interface IWelcomePage {}

const WelcomePage: React.FC<IWelcomePage> = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const navigateWithTransition = useTransitionNavigationHandler();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  return (
    <PageRoot data-test="welcome-page">
      <ContentContainer width="small" justifyContent="space-between">
        <Box
          data-test="welcome-branding-section"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            gap: { xs: 3, sm: 4.5 },
          }}
        >
          <Illustration name="eduriam-logo" width={128} height={128} />

          <Header variant="page" text="Eduriam" align="center" />

          <Box
            data-test="welcome-value-proposition-section"
            sx={{ width: "100%" }}
          >
            <Typography
              variant="subtitle1"
              color="text.secondary"
              align="center"
              sx={{ lineHeight: 1.35 }}
            >
              Master programming
              <br />
              just 10m a day.
            </Typography>
          </Box>
        </Box>

        <Box
          data-test="welcome-actions-section"
          sx={{ width: "100%", pb: { xs: 2, sm: 0 } }}
        >
          <Stack spacing={2}>
            <LargeButton
              data-test="signup-button"
              variant="contained"
              fullWidth
              onClick={navigateWithTransition("/signup")}
            >
              Continue
            </LargeButton>
            <LargeButton
              data-test="signin-button"
              variant="outlined"
              color="primary"
              fullWidth
              onClick={navigateWithTransition("/signin")}
            >
              Sign In
            </LargeButton>
          </Stack>
        </Box>
      </ContentContainer>
    </PageRoot>
  );
};

export default WelcomePage;
