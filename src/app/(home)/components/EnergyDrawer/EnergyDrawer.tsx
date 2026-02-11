"use client";

import {
  Drawer,
  Illustration,
  LargeButton,
  ProgressBar,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface IEnergyDrawerProps {
  /** Whether the drawer is open. */
  open: boolean;
  /** Called when the drawer should close. */
  onClose: () => void;
  /** Current remaining energy points for today (e.g. 12). */
  pointsLeft: number;
  /**
   * Progress value in percent (0–100) representing remaining energy.
   * This controls the fill of the progress bar.
   */
  progressValue: number;
  /** Optional data attribute for the drawer (E2E tests). */
  "data-test"?: string;
  /** Optional data attribute for the unlock button (E2E tests). */
  "data-test-unlock"?: string;
  /**
   * Optional callback invoked when the "Unlock unlimited energy" button is clicked.
   * Falls back to `onClose` when not provided.
   */
  onUnlockUnlimited?: () => void;
}

const clampProgress = (value: number): number => {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, value));
};

const EnergyDrawer: React.FC<IEnergyDrawerProps> = ({
  open,
  onClose,
  pointsLeft,
  progressValue,
  "data-test": dataTest,
  "data-test-unlock": dataTestUnlock,
  onUnlockUnlimited,
}) => {
  const { t } = useTranslation("common");

  const clampedProgress = clampProgress(progressValue);
  const handleUnlockClick = onUnlockUnlimited ?? onClose;

  return (
    <Drawer open={open} onClose={onClose} data-test={dataTest}>
      <Stack spacing={8} sx={{ width: "100%", textAlign: "center" }}>
        <Stack
          spacing={4}
          sx={{
            width: "100%",
            alignItems: "center",
            paddingY: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              width: "100%",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <ProgressBar
                value={clampedProgress}
                size="large"
                color="energy.main"
              />
            </Box>
            <Illustration name="energy" width={48} height={48} />
          </Box>

          <Stack spacing={2} sx={{ width: "100%" }}>
            <Typography variant="h5" align="center">
              {t("energy.pointsLeft", { pointsLeft })}
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
            >
              {t("energy.subtitle")}
            </Typography>
          </Stack>
        </Stack>

        <Stack sx={{ width: "100%" }}>
          <LargeButton
            onClick={handleUnlockClick}
            data-test={dataTestUnlock}
            fullWidth
          >
            {t("energy.button")}
          </LargeButton>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default EnergyDrawer;
