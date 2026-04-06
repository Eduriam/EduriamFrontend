"use client";

import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { parseRequiredId } from "util/functions/api";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";

import { UsersService } from "infrastructure/services/users/UsersService";

import AchievementBadge from "../components/AchievementBadge/AchievementBadge";

export interface IUsersAchievementsPage {
  params: {
    userId: string;
  };
}

const UsersAchievementsPage: React.FC<IUsersAchievementsPage> = ({ params }) => {
  const router = useRouter();
  const userId = parseRequiredId(params.userId);
  const safeUserId = userId ?? 0;
  const { userProfile } = UsersService.useUser(safeUserId);
  const navigateWithTransition = useTransitionNavigationHandler();
  const { t } = useTranslation("common");

  const achievements = userProfile?.achievements ?? [];

  useEffect(() => {
    if (userId === null) {
      router.replace("/");
    }
  }, [router, userId]);

  return (
    <PageRoot>
      <PageNavigation topNavigation={<BasicNavbar
        header={t("achievements.achievements")}
        leftButton={{
          icon: "arrowLeft",
          onClick: navigateWithTransition(`/users/${safeUserId}`, {
            direction: "back",
          }),
        }}
      />} mainNavigation="hidden" />

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
              key={achievement.id}
              badgeIconName={achievement.badgeIconName}
              name={achievement.title}
              showText
              completed={achievement.userProgress.value >= achievement.userProgress.goal}
            />
          ))}
        </Box>
      </ContentContainer>
    </PageRoot>
  );
};

export default UsersAchievementsPage;
