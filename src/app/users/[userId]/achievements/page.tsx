"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import Box from "@mui/material/Box";

import UsersAPI from "infrastructure/api/users/UsersAPI";

import AchievementBadge from "../components/AchievementBadge/AchievementBadge";

export interface IUsersAchievementsPage {
  params: {
    userId: string;
  };
}

const UsersAchievementsPage: React.FC<IUsersAchievementsPage> = ({ params }) => {
  const { userProfile } = UsersAPI.useUser(params.userId);
  const navigateWithTransition = useTransitionNavigationHandler();
  const { t } = useTranslation("common");

  const achievements = userProfile?.achievements ?? [];

  return (
    <PageRoot>
      <BasicNavbar
        header={t("achievements.achievements")}
        leftButton={{
          icon: "arrowLeft",
          onClick: navigateWithTransition(`/users/${params.userId}`, {
            direction: "back",
          }),
        }}
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
              key={achievement.id}
              badgeIconName={achievement.badgeIconName}
              name={achievement.title}
              showText
              completed={achievement.progress >= 100 || achievement.collectedReward}
            />
          ))}
        </Box>
      </ContentContainer>
    </PageRoot>
  );
};

export default UsersAchievementsPage;
