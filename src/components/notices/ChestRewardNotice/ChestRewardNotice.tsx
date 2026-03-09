import {
  DESKTOP_PADDING_X,
  Illustration,
  MOBILE_PADDING_X,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useEffect, useMemo, useRef, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";

import NoticeDialog from "components/notices/NoticeDialog/NoticeDialog";

import ChestsAPI from "infrastructure/api/users/me/chests/ChestsAPI";
import type { ChestRewardNotice as ChestRewardNoticeType } from "infrastructure/api/users/me/notices/Notices";
import useAuth from "infrastructure/services/AuthProvider";
import useNotices from "infrastructure/services/NoticeProvider";

export interface ChestRewardNoticeProps {
  notice: ChestRewardNoticeType;
}

const chestAppearKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 56px) rotate(0deg) scale(0.82);
  }
  52% {
    opacity: 1;
    transform: translate(-14px, -24px) rotate(-9deg) scale(1.04);
  }
  74% {
    transform: translate(6px, 10px) rotate(4deg) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
`;

const rewardAppearKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateY(24px) scale(0.7);
  }
  65% {
    opacity: 1;
    transform: translateY(-6px) scale(1.08);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const BALANCE_ANIMATION_START_MS = 1400;
const BALANCE_ANIMATION_DURATION_MS = 900;
const FALLBACK_BALANCE = 254;

const ChestRewardNotice: React.FC<ChestRewardNoticeProps> = ({ notice }) => {
  const { t } = useTranslation("common");
  const { user } = useAuth();
  const { markNoticeAsRead } = useNotices();
  const [isLoading, setIsLoading] = useState(false);
  const baseBalanceRef = useRef<number>(user?.balance ?? FALLBACK_BALANCE);

  const initialBalance = baseBalanceRef.current;
  const rewardAmount = useMemo(
    () => Math.max(0, notice.reward),
    [notice.reward],
  );
  const targetBalance = initialBalance + rewardAmount;
  const [displayedBalance, setDisplayedBalance] = useState(initialBalance);

  useEffect(() => {
    setDisplayedBalance(initialBalance);

    let animationFrameId: number | null = null;
    const timerId = window.setTimeout(() => {
      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const progress = Math.min(
          (currentTime - startTime) / BALANCE_ANIMATION_DURATION_MS,
          1,
        );
        const easedProgress = 1 - (1 - progress) ** 3;
        const nextValue = Math.round(
          initialBalance + (targetBalance - initialBalance) * easedProgress,
        );

        setDisplayedBalance(nextValue);

        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(animate);
        }
      };

      animationFrameId = window.requestAnimationFrame(animate);
    }, BALANCE_ANIMATION_START_MS);

    return () => {
      window.clearTimeout(timerId);
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [initialBalance, targetBalance, notice.id]);

  const finalizeChestOpen = async (doubleReward: boolean) => {
    const payload = doubleReward
      ? { open: true as const, doubleReward: true as const }
      : { open: true as const };

    await ChestsAPI.openChest(notice.chestId, payload);
    await markNoticeAsRead(notice.id);
  };

  const handleDoubleReward = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      // Todo implement AD reward service and logic
      const rewardedSuccessfully = true;
      await finalizeChestOpen(rewardedSuccessfully);
    } catch {
      await finalizeChestOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      await finalizeChestOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NoticeDialog
      data-test="chest-reward-notice"
      navbar={
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: "background.default",
            boxShadow: "none",
          }}
        >
          <Toolbar
            sx={(theme) => ({
              alignItems: "center",
              display: "flex",
              height: "64px",
              justifyContent: "space-between",
              minHeight: "64px",
              position: "relative",
              margin: "0 auto",
              maxWidth: 1000,
              width: "100%",
              px: MOBILE_PADDING_X,
              [theme.breakpoints.up("sm")]: {
                px: DESKTOP_PADDING_X,
              },
            })}
          >
            <Box />
            <Box>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                data-test="notice-balance-section"
              >
                <Illustration name="coin" width={32} height={32} />
                <Typography
                  textAlign="center"
                  sx={{ fontSize: "22px", fontWeight: 500, lineHeight: "28px" }}
                >
                  {displayedBalance}
                </Typography>
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>
      }
      primaryButton={{
        onClick: () => {
          void handleDoubleReward();
        },
        text: t("notices.getDoubleReward"),
        dataTest: "get-double-reward-button",
        disabled: isLoading,
      }}
      secondaryButton={{
        onClick: () => {
          void handleContinue();
        },
        text: t("userActions.continue"),
        dataTest: "continue-button",
        disabled: isLoading,
      }}
      transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
    >
      <Stack sx={{ width: "100%" }}>
        <Stack spacing={8} alignItems="center" sx={{ width: "100%", mt: 14 }}>
          <Typography variant="h5" textAlign="center">
            {t("notices.chestRewardTitle")}
          </Typography>

          <Stack spacing={1.5} alignItems="center">
            <Box
              sx={{
                animation: `${chestAppearKeyframes} 850ms cubic-bezier(0.21, 1.05, 0.42, 1) 100ms both`,
              }}
            >
              <Illustration name="chest" width={140} height={140} />
            </Box>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                opacity: 0,
                animation: `${rewardAppearKeyframes} 700ms ease-out 620ms forwards`,
              }}
            >
              <Illustration name="coin" width={40} height={40} />
              <Typography variant="h3" textAlign="center" lineHeight="48px">
                {rewardAmount}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </NoticeDialog>
  );
};

export default ChestRewardNotice;
