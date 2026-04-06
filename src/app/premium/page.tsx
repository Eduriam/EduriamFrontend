"use client";

import {
  ContentContainer,
  LargeButton,
  PageRoot,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useEffect, useMemo, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import PageNavigation from "components/navigation/PageNavigation/PageNavigation";
import PremiumBenefits from "components/premium/PremiumBenefits/PremiumBenefits";
import { getPremiumBackgroundGradient } from "components/premium/premiumBackground";

import { UserRole } from "infrastructure/api/generated/models";

import useAuth from "infrastructure/services/AuthProvider";

import { PREMIUM_MESSAGES, type PremiumMessageValue } from "./premiumMessages";

export interface IPremiumPage {}

const PremiumPage: React.FC<IPremiumPage> = () => {
  const { t } = useTranslation("common");
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const isPremiumUser = user?.role === UserRole.PremiumUser;

  const [message, setMessage] = useState<PremiumMessageValue>(() => {
    const messageFromQuery = searchParams.get(PREMIUM_MESSAGES.queryParam);
    return (
      (messageFromQuery as PremiumMessageValue) || PREMIUM_MESSAGES.default
    );
  });

  useEffect(() => {
    const currentMessage = searchParams.get(PREMIUM_MESSAGES.queryParam);
    if (currentMessage) {
      setMessage(currentMessage as PremiumMessageValue);
    }

    if (searchParams.toString().length > 0) {
      router.replace("/premium", { scroll: false });
    }
  }, [router, searchParams]);

  const subtitle = useMemo(() => {
    if (message === PREMIUM_MESSAGES.noEnergyLeft) {
      return t("premium.subtitles.noEnergyLeft");
    }

    if (message === PREMIUM_MESSAGES.certificateLocked) {
      return t("premium.subtitles.certificateLocked");
    }

    if (message === PREMIUM_MESSAGES.courseLocked) {
      return t("premium.subtitles.courseLocked");
    }

    if (message === PREMIUM_MESSAGES.learningPathLocked) {
      return t("premium.subtitles.learningPathLocked");
    }

    return t("premium.subtitles.default");
  }, [message, t]);

  const subtitleDataTest = useMemo(() => {
    if (message === PREMIUM_MESSAGES.noEnergyLeft) {
      return "no-energy-left-section";
    }

    if (message === PREMIUM_MESSAGES.certificateLocked) {
      return "certificate-locked-section";
    }

    if (message === PREMIUM_MESSAGES.courseLocked) {
      return "course-locked-section";
    }

    if (message === PREMIUM_MESSAGES.learningPathLocked) {
      return "learning-path-locked-section";
    }

    return "premium-default-message-section";
  }, [message]);

  return (
    <PageRoot data-test="premium-page">
      <PageNavigation topNavigation="hidden" mainNavigation="show" />
      <Box
        sx={{
          backgroundImage: getPremiumBackgroundGradient(theme.palette.mode),
        }}
      >
        <ContentContainer
          width="small"
          justifyContent="flex-start"
          spacing={24}
        >
          <Stack spacing={8}>
            <Stack spacing={4} alignItems="center">
              <Typography variant="h3" align="center">
                {isPremiumUser
                  ? t("premium.premiumUserHeader")
                  : t("premium.header")}
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                data-test={subtitleDataTest}
              >
                {isPremiumUser ? t("premium.premiumUserSubtitle") : subtitle}
              </Typography>
            </Stack>

            <PremiumBenefits />
          </Stack>

          <LargeButton
            fullWidth
            variant={isPremiumUser ? "text" : "contained"}
            onClick={() =>
              router.push(isPremiumUser ? "/manage-subscription" : "/free-trial")
            }
            data-test={
              isPremiumUser
                ? "manage-subscription-button"
                : "start-free-trial-button"
            }
          >
            {isPremiumUser
              ? t("premium.manageSubscription")
              : t("premium.startFreeTrial")}
          </LargeButton>
        </ContentContainer>
      </Box>
    </PageRoot>
  );
};

export default PremiumPage;
