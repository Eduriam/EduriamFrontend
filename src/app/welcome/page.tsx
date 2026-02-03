"use client";

import { Header, LargeButton } from "@eduriam/ui-core";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
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
    <Box
      data-test="welcome-page"
      sx={{
        bgcolor: "background.default",
        minHeight: "100svh",
        display: "flex",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          py: { xs: 5, sm: 7 },
        }}
      >
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
            pt: { xs: 2, sm: 4 },
          }}
        >
          <Box
            component="img"
            src="/images/illustrations/eduriam-logo.svg"
            alt="Eduriam"
            sx={{ width: 128, height: 128, display: "block" }}
          />

          <Header
            level="page"
            text="Eduriam"
            sx={{
              textAlign: "center",
              color: "#000",
              fontWeight: 700,
              fontSize: 40,
              lineHeight: 1.1,
            }}
          />

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
              data-test="login-button"
              variant="outlined"
              color="primary"
              fullWidth
              onClick={navigateWithTransition("/login")}
            >
              Sign In
            </LargeButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default WelcomePage;
