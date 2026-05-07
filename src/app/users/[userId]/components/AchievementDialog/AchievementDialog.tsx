"use client";

import {
  BasicNavbar,
  ContentContainer,
  FullscreenDialog,
  ProgressBar,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { UserAchievementModel } from "infrastructure/api/generated/models";

import AchievementBadge from "../AchievementBadge/AchievementBadge";
import {
  type AchievementDialogTextState,
  isAchievementCompleted,
  isAchievementMaxLevelCompleted,
  toAchievementBadgeIconName,
  toAchievementDialogTextKey,
  toAchievementTitleKey,
} from "../../util/achievementUtils";

export interface AchievementDialogProps {
  achievement?: UserAchievementModel;
  isOwnProfile: boolean;
  onClose: () => void;
  open: boolean;
  userName?: string;
}

const DESCRIPTION_WIDTH = 309;
const PROGRESS_WIDTH = 309;

const AchievementDialog: React.FC<AchievementDialogProps> = ({
  achievement,
  isOwnProfile,
  onClose,
  open,
  userName,
}) => {
  const { t } = useTranslation("common");

  if (!achievement) {
    return null;
  }

  const achieved = isAchievementCompleted(achievement);
  const completedAllLevels = isAchievementMaxLevelCompleted(achievement);
  const title = t(toAchievementTitleKey(achievement.type));
  const goal = toAchievementRequirement(achievement);
  const nextLevelGoal = achievement.nextLevelGoal ?? goal;
  const progressTarget = achieved ? nextLevelGoal : goal;
  const showProgress = isOwnProfile && !completedAllLevels && progressTarget > 0;
  const progressValue = toProgressPercentage(
    achievement.progress,
    progressTarget,
  );
  const levelLabel = achieved
    ? t("achievements.dialog.level", {
        currentLevel: achievement.currentLevel,
        maxLevel: achievement.achievementMaxLevel,
      })
    : undefined;
  const description = getAchievementDescription({
    achieved,
    completedAllLevels,
    goal,
    isOwnProfile,
    nextLevelGoal,
    t,
    type: achievement.type,
    userName: userName ?? "",
  });

  return (
    <FullscreenDialog
      open={open}
      onClose={onClose}
      dataTest="achievement-dialog"
    >
      <BasicNavbar
        leftButton={{
          icon: "close",
          onClick: onClose,
          dataTest: "close-achievement-dialog-button",
        }}
      />

      <ContentContainer width="small" justifyContent="flex-start">
        <Stack
          spacing={10}
          alignItems="center"
          sx={{ width: "100%", pt: 8 }}
          data-test="achievement-dialog-content"
        >
          <Stack spacing={2} alignItems="center" sx={{ width: "100%" }}>
            <AchievementBadge
              badgeIconName={toAchievementBadgeIconName(achievement.type)}
              completed={achieved}
              size="large"
            />

            <Stack spacing={0.5} alignItems="center" sx={{ width: "100%" }}>
              <Typography
                variant="h5"
                sx={{
                  color: achieved ? "text.primary" : "text.disabled",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {title}
              </Typography>

              {levelLabel && (
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", textAlign: "center" }}
                >
                  {levelLabel}
                </Typography>
              )}
            </Stack>
          </Stack>

          <Stack spacing={2} alignItems="center" sx={{ width: "100%" }}>
            <Typography
              variant="subtitle1"
              sx={{
                width: DESCRIPTION_WIDTH,
                maxWidth: "100%",
                color: achieved ? "text.primary" : "text.secondary",
                textAlign: "center",
              }}
            >
              {description}
            </Typography>

            {showProgress && (
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ width: PROGRESS_WIDTH, maxWidth: "100%" }}
                data-test="achievement-progress-section"
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <ProgressBar value={progressValue} size="large" />
                </Box>
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {`${achievement.progress}/${progressTarget}`}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </ContentContainer>
    </FullscreenDialog>
  );
};

interface AchievementDescriptionOptions {
  achieved: boolean;
  completedAllLevels: boolean;
  goal: number;
  isOwnProfile: boolean;
  nextLevelGoal: number;
  t: ReturnType<typeof useTranslation>["t"];
  type: UserAchievementModel["type"];
  userName: string;
}

function getAchievementDescription({
  achieved,
  completedAllLevels,
  goal,
  isOwnProfile,
  nextLevelGoal,
  t,
  type,
  userName,
}: AchievementDescriptionOptions): string {
  const state = toAchievementDialogTextState({
    achieved,
    completedAllLevels,
    isOwnProfile,
  });
  const key = toAchievementDialogTextKey(type, state);
  const values = { goal, nextLevelGoal, userName };

  return t(key, values);
}

interface AchievementDialogTextStateOptions {
  achieved: boolean;
  completedAllLevels: boolean;
  isOwnProfile: boolean;
}

function toAchievementDialogTextState({
  achieved,
  completedAllLevels,
  isOwnProfile,
}: AchievementDialogTextStateOptions): AchievementDialogTextState {
  if (!isOwnProfile) {
    return achieved ? "otherUserAchieved" : "otherUserNotAchieved";
  }

  if (!achieved) {
    return "notAchieved";
  }

  if (completedAllLevels) {
    return "completedAllLevels";
  }

  return "inProgress";
}

function toAchievementRequirement(achievement: UserAchievementModel): number {
  return (
    achievement.goal ??
    achievement.nextLevelGoal ??
    Math.max(achievement.achievementMaxLevel, 1)
  );
}

function toProgressPercentage(progress: number, target: number): number {
  if (target <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(100, (progress / target) * 100));
}

export default AchievementDialog;
