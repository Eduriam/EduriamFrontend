"use client";

import { ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { parseRequiredId } from "util/functions/api";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";

import BackNavbar from "components/navigation/BackNavbar/BackNavbar";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import type { UserAchievementModel } from "infrastructure/api/generated/models";
import useAuth from "infrastructure/services/AuthProvider";
import { UsersService } from "infrastructure/services/users/UsersService";

import AchievementBadge from "../components/AchievementBadge/AchievementBadge";
import AchievementDialog from "../components/AchievementDialog/AchievementDialog";
import {
  isAchievementCompleted,
  toAchievementBadgeIconName,
  toAchievementTitleKey,
} from "../util/achievementUtils";

export interface IUsersAchievementsPage {
  params: {
    userId: string;
  };
}

const UsersAchievementsPage: React.FC<IUsersAchievementsPage> = ({
  params,
}) => {
  const router = useRouter();
  const userId = parseRequiredId(params.userId);
  const safeUserId = userId ?? 0;
  const { userProfile } = UsersService.useUser(safeUserId);
  const { user } = useAuth();
  const { t } = useTranslation("common");
  const [selectedAchievement, setSelectedAchievement] =
    useState<UserAchievementModel>();

  const achievements = userProfile?.achievements ?? [];
  const isOwnProfile = userId !== null && user?.id === userId;

  useEffect(() => {
    if (userId === null) {
      router.replace("/");
    }
  }, [router, userId]);

  return (
    <PageRoot>
      <PageNavigation
        topNavigation={
          <BackNavbar
            withTransition
            route={`/users/${safeUserId}`}
            header={t("achievements.achievements")}
          />
        }
        mainNavigation="hidden"
      />

      <ContentContainer width="small" justifyContent="flex-start">
        <Box
          data-test="achievements-list-section"
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            rowGap: 2,
            columnGap: 2,
            justifyItems: "center",
          }}
        >
          {achievements.map((achievement) => (
            <AchievementBadge
              key={achievement.achievementId}
              badgeIconName={toAchievementBadgeIconName(achievement.type)}
              name={t(toAchievementTitleKey(achievement.type))}
              showText
              completed={isAchievementCompleted(achievement)}
              onClick={() => setSelectedAchievement(achievement)}
              data-test="achievement-button"
            />
          ))}
        </Box>
      </ContentContainer>

      <AchievementDialog
        open={Boolean(selectedAchievement)}
        achievement={selectedAchievement}
        isOwnProfile={isOwnProfile}
        userName={userProfile?.name}
        onClose={() => setSelectedAchievement(undefined)}
      />
    </PageRoot>
  );
};

export default UsersAchievementsPage;
