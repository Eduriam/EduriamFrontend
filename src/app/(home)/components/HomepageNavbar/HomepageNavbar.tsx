"use client";

import { IconButton, Illustration } from "@eduriam/ui-core";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface IHomepageNavbar {
  /** Current streak count */
  streak?: number;
  /** Current coin balance */
  coins?: number;
  /** Current energy count */
  energy?: number;
  /** Click handler for study plan button */
  onStudyPlanClick: () => void;
  /** Optional data attribute for study plan button E2E tests */
  "data-test-study-plan-button"?: string;
}

const HomepageNavbar: React.FC<IHomepageNavbar> = ({
  streak = 0,
  coins = 0,
  energy = 0,
  onStudyPlanClick,
  "data-test-study-plan-button": dataTestStudyPlanButton,
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      padding={4}
      sx={{ backgroundColor: "background.default" }}
    >
      {/* Streak */}
      <Stack direction="row" alignItems="center" gap={2}>
        <Illustration name="fire" width={32} height={32} />
        <Typography variant="h6" fontWeight="medium">
          {streak}
        </Typography>
      </Stack>

      {/* Coins */}
      <Stack direction="row" alignItems="center" gap={2}>
        <Illustration name="coin" width={32} height={32} />
        <Typography variant="h6" fontWeight="medium">
          {coins >= 1000 ? `${Math.floor(coins / 1000)}k` : coins}
        </Typography>
      </Stack>

      {/* Energy */}
      <Stack direction="row" alignItems="center" gap={2}>
        <Illustration name="energy" width={32} height={32} />
        <Typography variant="h6" fontWeight="medium">
          {energy}
        </Typography>
      </Stack>

      {/* Study Plan Button */}
      <IconButton
        icon="studyPlan"
        variant="text"
        size="medium"
        color="textPrimary"
        onClick={onStudyPlanClick}
        data-test={dataTestStudyPlanButton}
      />
    </Stack>
  );
};

export default HomepageNavbar;
