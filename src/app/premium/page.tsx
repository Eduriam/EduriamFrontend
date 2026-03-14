"use client";

import {
  ContentContainer,
  Illustration,
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

import useAuth from "infrastructure/services/AuthProvider";

import { PREMIUM_MESSAGES, type PremiumMessageValue } from "./premiumMessages";

export interface IPremiumPage {}

type BenefitItem = {
  id: string;
  titleKey: string;
  free: boolean;
  premium: boolean;
};

const PREMIUM_COLUMN_WIDTH = 80;
const BENEFITS_COLUMNS_GAP = 8;
const BENEFIT_ROW_VERTICAL_PADDING = 4;
const PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_X = 16;
const PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_Y = 4;

const PREMIUM_INNER_BOX_WIDTH = 89;
const PREMIUM_INNER_BOX_TOP = 56;
const PREMIUM_INNER_BOX_BOTTOM = 8;
const PREMIUM_BACKGROUND_GRADIENT_DESKTOP =
  "linear-gradient(165deg, rgba(255, 191, 0, 0.2) 0%, rgba(0, 0, 0, 0) 30%), linear-gradient(195deg, rgb(205, 209, 250) 0%, rgba(0, 0, 0, 0) 25%)";
const PREMIUM_BACKGROUND_GRADIENT_MOBILE =
  "linear-gradient(165deg, rgba(255, 191, 0, 0.2) 0%, rgba(0, 0, 0, 0) 30%), linear-gradient(210deg, rgb(205, 209, 250) 0%, rgba(0, 0, 0, 0) 25%)";
const PREMIUM_BACKGROUND_GRADIENT_DARK_DESKTOP =
  "linear-gradient(158deg, rgba(255, 145, 77, 0.2) 0%, rgba(255, 145, 77, 0) 42%), linear-gradient(202deg, rgba(108, 125, 255, 0.2) 0%, rgba(108, 125, 255, 0) 34%)";
const PREMIUM_BACKGROUND_GRADIENT_DARK_MOBILE =
  "linear-gradient(164deg, rgba(255, 145, 77, 0.2) 0%, rgba(255, 145, 77, 0) 42%), linear-gradient(218deg, rgba(108, 125, 255, 0.2) 0%, rgba(108, 125, 255, 0) 34%)";

const BENEFITS: BenefitItem[] = [
  {
    id: "daily-learning",
    titleKey: "premium.benefits.dailyLearning",
    free: true,
    premium: true,
  },
  {
    id: "unlimited-learning",
    titleKey: "premium.benefits.unlimitedLearning",
    free: false,
    premium: true,
  },
  {
    id: "no-ads",
    titleKey: "premium.benefits.noAds",
    free: false,
    premium: true,
  },
  {
    id: "smart-reviews",
    titleKey: "premium.benefits.smartReviews",
    free: false,
    premium: true,
  },
  {
    id: "certificates",
    titleKey: "premium.benefits.certificates",
    free: false,
    premium: true,
  },
];

const PremiumPage: React.FC<IPremiumPage> = () => {
  const { t } = useTranslation("common");
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const isPremiumUser = user?.role === "PREMIUM_USER";

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
          backgroundImage: {
            xs:
              theme.palette.mode === "dark"
                ? PREMIUM_BACKGROUND_GRADIENT_DARK_MOBILE
                : PREMIUM_BACKGROUND_GRADIENT_MOBILE,
            md:
              theme.palette.mode === "dark"
                ? PREMIUM_BACKGROUND_GRADIENT_DARK_DESKTOP
                : PREMIUM_BACKGROUND_GRADIENT_DESKTOP,
          },
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

            <Box sx={{ position: "relative", width: "100%" }}>
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              >
                {Array.from({ length: BENEFITS.length }).map(
                  (_, dividerIndex) => (
                    <Box
                      key={`long-divider-${dividerIndex}`}
                      sx={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: `${((dividerIndex + 1) / (BENEFITS.length + 1)) * 100}%`,
                        borderTop: "1px solid",
                        borderColor: "divider",
                      }}
                    />
                  ),
                )}
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  top: -PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_Y,
                  right: -PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_X,
                  width:
                    PREMIUM_COLUMN_WIDTH +
                    PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_X * 2,
                  height: `calc(100% + ${PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_Y * 2}px)`,
                  borderRadius: 4,
                  backgroundImage:
                    "linear-gradient(92.290608deg, rgb(255, 233, 181) 6.5812%, rgb(255, 170, 65) 93.315%)",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: PREMIUM_INNER_BOX_TOP,
                    bottom: PREMIUM_INNER_BOX_BOTTOM,
                    right:
                      (PREMIUM_COLUMN_WIDTH +
                        PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_X * 2 -
                        PREMIUM_INNER_BOX_WIDTH) /
                      2,
                    width: PREMIUM_INNER_BOX_WIDTH,
                    borderRadius: 4,
                    bgcolor: "background.default",
                    overflow: "hidden",
                    zIndex: 3,
                  }}
                ></Box>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 3,
                  pointerEvents: "none",
                }}
              >
                {Array.from({ length: BENEFITS.length - 1 }).map(
                  (_, dividerIndex) => (
                    <Box
                      key={`premium-inner-divider-${dividerIndex}`}
                      sx={{
                        position: "absolute",
                        right:
                          -PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_X +
                          (PREMIUM_COLUMN_WIDTH +
                            PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_X * 2 -
                            PREMIUM_INNER_BOX_WIDTH) /
                            2 +
                          4,
                        width: PREMIUM_INNER_BOX_WIDTH - 8,
                        top: `${((dividerIndex + 2) / (BENEFITS.length + 1)) * 100}%`,
                        borderTop: "1px solid",
                        borderColor: "divider",
                      }}
                    />
                  ),
                )}
              </Box>
              <Stack spacing={0} sx={{ position: "relative", zIndex: 4 }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: `1fr ${PREMIUM_COLUMN_WIDTH}px ${PREMIUM_COLUMN_WIDTH}px`,
                    columnGap: BENEFITS_COLUMNS_GAP,
                    alignItems: "center",
                    py: BENEFIT_ROW_VERTICAL_PADDING,
                  }}
                >
                  <Typography variant="body1" fontWeight={700}>
                    {t("premium.table.benefits")}
                  </Typography>
                  <Typography variant="body1" fontWeight={700} align="center">
                    {t("premium.table.free")}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={700}
                    align="center"
                    color="common.black"
                  >
                    {t("premium.table.premium")}
                  </Typography>
                </Box>

                {BENEFITS.map((benefit) => (
                  <Box
                    key={benefit.id}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: `1fr ${PREMIUM_COLUMN_WIDTH}px ${PREMIUM_COLUMN_WIDTH}px`,
                      columnGap: BENEFITS_COLUMNS_GAP,
                      alignItems: "center",
                      py: BENEFIT_ROW_VERTICAL_PADDING,
                    }}
                  >
                    <Typography variant="body1">
                      {t(benefit.titleKey)}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      {benefit.free ? (
                        <Illustration name="check" width={22} height={22} />
                      ) : (
                        <Illustration name="cross" width={22} height={22} />
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {benefit.premium ? (
                        <Illustration name="check" width={22} height={22} />
                      ) : (
                        <Illustration name="cross" width={22} height={22} />
                      )}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>

          <LargeButton
            fullWidth
            variant={isPremiumUser ? "text" : "contained"}
            onClick={() =>
              router.push(isPremiumUser ? "/manage-subscription" : "/payment")
            }
            data-test={
              isPremiumUser
                ? "manage-subscription-button"
                : "subscribe-now-button"
            }
          >
            {isPremiumUser
              ? t("premium.manageSubscription")
              : t("premium.subscribeNow")}
          </LargeButton>
        </ContentContainer>
      </Box>
    </PageRoot>
  );
};

export default PremiumPage;
