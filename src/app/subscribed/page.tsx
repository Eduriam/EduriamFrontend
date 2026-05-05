"use client";

import {
  BasicNavbar,
  ContentContainer,
  LargeButton,
  PageRoot,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import Image from "next/image";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import PageNavigation from "components/navigation/PageNavigation/PageNavigation";
import { getPremiumBackgroundGradient } from "components/premium/premiumBackground";

export interface ISubscribedPage {}

const SubscribedPage: React.FC<ISubscribedPage> = () => {
  const { t } = useTranslation("common");
  const theme = useTheme();
  const navigateWithTransition = useTransitionNavigationHandler();

  return (
    <PageRoot data-test="subscribed-page">
      <Stack
        sx={{
          minHeight: "100dvh",
          backgroundImage: getPremiumBackgroundGradient(theme.palette.mode),
        }}
      >
        <PageNavigation
          topNavigation={
            <BasicNavbar
              background="transparent"
              leftButton={{
                icon: "close",
                onClick: navigateWithTransition("/"),
                dataTest: "close-subscribed-button",
              }}
            />
          }
          mainNavigation="hidden"
        />
        <ContentContainer width="small" justifyContent="space-between">
          <Stack spacing={8} alignItems="center">
            <Typography variant="h3" align="center">
              {t("subscribed.thankYou")}
            </Typography>

            <Box sx={{ width: { xs: 271, sm: 300 }, maxWidth: "100%" }}>
              <Image
                src="/images/subscription/subscribed.svg"
                alt={t("subscribed.thankYou")}
                width={271}
                height={206}
                style={{ width: "100%", height: "auto" }}
                priority
              />
            </Box>

            <Typography variant="h6" align="center" sx={{ maxWidth: 280 }}>
              {t("subscribed.subscriptionActivated")}
            </Typography>
          </Stack>

          <LargeButton
            fullWidth
            onClick={navigateWithTransition("/")}
            data-test="continue-subscribed-button"
          >
            {t("userActions.continue")}
          </LargeButton>
        </ContentContainer>
      </Stack>
    </PageRoot>
  );
};

export default SubscribedPage;
