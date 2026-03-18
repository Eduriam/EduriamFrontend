"use client";

import {
  DESKTOP_PADDING_X,
  IconButton,
  Illustration,
  MOBILE_PADDING_X,
} from "@eduriam/ui-core";

import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export interface IHomepageNavbar {
  /** Current streak count */
  streak?: number;
  /** Current coin balance */
  coins?: number;
  /** Current energy count */
  energy?: number;
  /** Invoked when the streak section is clicked. */
  onStreakClick?: () => void;
  /** Invoked when the coins section is clicked. */
  onCoinsClick?: () => void;
  /** Invoked when the energy section is clicked. */
  onEnergyClick?: () => void;
  /** Click handler for study plan button */
  onStudyPlanClick: () => void;
  /** Optional data attribute for study plan button E2E tests */
  "data-test-study-plan-button"?: string;
}

const HomepageNavbar: React.FC<IHomepageNavbar> = ({
  streak = 0,
  coins = 0,
  energy = 0,
  onStreakClick,
  onCoinsClick,
  onEnergyClick,
  onStudyPlanClick,
  "data-test-study-plan-button": dataTestStudyPlanButton,
}) => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      enableColorOnDark
      sx={(theme) => ({
        backgroundColor: `${theme.palette.background.default} !important`,
        backgroundImage: "none",
        boxShadow: "none",
      })}
    >
      <Toolbar
        sx={(theme) => ({
          display: "flex",
          justifyContent: "flex-end",
          minHeight: { xs: 56 },
          px: MOBILE_PADDING_X,
          [theme.breakpoints.up("sm")]: {
            px: DESKTOP_PADDING_X,
          },
          maxWidth: 1000,
          margin: "0 auto",
          width: "100%",
        })}
      >
        {/* Streak, coins, energy, study plan: aligned to the right */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0, md: 4 }}
          sx={{
            justifyContent: "flex-end",
            width: "auto",
          }}
        >
          {/* Streak */}
          <Stack
            direction="row"
            alignItems="center"
            gap={2}
            onClick={onStreakClick}
            sx={{ cursor: onStreakClick ? "pointer" : "default" }}
            data-test="streak-section"
          >
            <Illustration name="fire" width={32} height={32} />
            <Typography variant="h6" fontWeight="medium">
              {streak}
            </Typography>
          </Stack>

          {/* Coins */}
          <Stack
            direction="row"
            alignItems="center"
            gap={2}
            onClick={onCoinsClick}
            sx={{ cursor: onCoinsClick ? "pointer" : "default" }}
            data-test="coins-section"
          >
            <Illustration name="coin" width={32} height={32} />
            <Typography variant="h6" fontWeight="medium">
              {coins >= 1000 ? `${Math.floor(coins / 1000)}k` : coins}
            </Typography>
          </Stack>

          {/* Energy */}
          <Stack
            direction="row"
            alignItems="center"
            gap={2}
            onClick={onEnergyClick}
            sx={{ cursor: onEnergyClick ? "pointer" : "default" }}
            data-test="energy-section"
          >
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
      </Toolbar>
    </AppBar>
  );
};

export default HomepageNavbar;
