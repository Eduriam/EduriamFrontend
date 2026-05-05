"use client";

import { Drawer, Illustration } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface IStreakDrawerProps {
  /** Controls the underlying drawer visibility. */
  open: boolean;
  /** Invoked when the drawer should be dismissed. */
  onClose: () => void;
  /** Total number of consecutive streak days. */
  streakDays: number;
  /** How many streak-freeze power-ups are currently equipped. */
  equippedStreakFreezes: number;
  /** Maximum number of streak-freeze slots available. */
  maxStreakFreezes: number;
  /** Optional data attribute for e2e tests. */
  "data-test"?: string;
}

const formatNumber = (value: number) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 0 });

const StreakDrawer: React.FC<IStreakDrawerProps> = ({
  open,
  onClose,
  streakDays,
  equippedStreakFreezes,
  maxStreakFreezes,
  "data-test": dataTest,
}) => {
  const { t } = useTranslation("common");

  const formattedStreakCount = formatNumber(streakDays);
  const streakLabel = t("streakDrawer.daysLabel", {
    countFormatted: formattedStreakCount,
  });
  const effectiveMaxStreakFreezes =
    maxStreakFreezes > 0
      ? maxStreakFreezes
      : Math.max(equippedStreakFreezes, 1);
  const formattedEquipped = formatNumber(equippedStreakFreezes);
  const formattedMax = formatNumber(effectiveMaxStreakFreezes);
  const streakFreezeLabel = t("streakDrawer.equippedLabel", {
    equippedFormatted: formattedEquipped,
    maxFormatted: formattedMax,
  });

  return (
    <Drawer open={open} onClose={onClose} data-test={dataTest}>
      <Stack spacing={6} alignItems="center" sx={{ width: "100%" }}>
        <Stack spacing={3} alignItems="center" sx={{ width: "100%" }}>
          <Typography variant="h5" fontWeight={600} align="center">
            {t("streakDrawer.title")}
          </Typography>

          <Stack spacing={3} alignItems="center">
            <Illustration name="fire" width={128} height={128} />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {streakLabel}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ width: "100%" }} />

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Illustration name="streakFreeze" width={64} height={64} />

          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={600}>
              {t("streakDrawer.freezeTitle")}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {streakFreezeLabel}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default StreakDrawer;
