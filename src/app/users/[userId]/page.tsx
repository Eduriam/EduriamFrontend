"use client";

import { useTranslation } from "i18n/client";

import { useState } from "react";

import { PageRoot } from "@eduriam/ui-core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Popup, { IPopup } from "components/atoms/Popup/Popup";
import ProgressCard from "components/atoms/cards/ProgressCard/ProgressCard";
import UserProfileCard from "components/atoms/cards/UserProfileCard/UserProfileCard";
import UserStatsCard from "components/atoms/cards/UserStatsCard/UserStatsCard";

import { optimisticMutationOption } from "infrastructure/api/API";
import UserFollowingAPI from "infrastructure/api/user/following/UserFollowingAPI";
import UsersAPI from "infrastructure/api/users/UsersAPI";

export interface IUsersPage {
  params: {
    userId: string;
  };
}

const UsersPage: React.FC<IUsersPage> = ({ params }) => {
  const { userProfile, mutate } = UsersAPI.useUser(params.userId);
  const [popup, setPopup] = useState<IPopup | null>(null);
  const { t } = useTranslation("common");

  return (
    <PageRoot data-test="user-page">
      <Box display="flex" flexDirection="column" gap={2} sx={{ width: "100%" }}>
        {userProfile && (
          <UserProfileCard
            userProfile={userProfile}
            userId={params.userId}
            onFollowChange={(isFollowed) => {
              mutate(
                async () => {
                  if (isFollowed) {
                    await UserFollowingAPI.followUser(params.userId);
                  } else {
                    await UserFollowingAPI.unfollowUser(params.userId);
                  }

                  return { ...userProfile, isFollowed };
                },
                optimisticMutationOption({ ...userProfile, isFollowed }),
              );
            }}
          />
        )}

        <Typography variant="subtitle1">{t("userProfile.stats")}</Typography>
        {userProfile && (
          <UserStatsCard
            learningStats={userProfile.learningStats}
            streak={userProfile.streak}
          />
        )}

        {popup && <Popup {...popup} open={true} onClose={() => setPopup(null)} />}

        {userProfile && userProfile.achievements && (
          <>
            <Typography variant="subtitle1">
              {t("achievements.achievements")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {userProfile.achievements.map((achievement) => {
                return (
                  <ProgressCard
                    key={achievement.id}
                    header={achievement.title}
                    subheader={achievement.description}
                    imageUrl={achievement.imageUrl}
                    onClick={() => {
                      setPopup({
                        displayCloseButton: true,
                        subheader: achievement.title,
                        imageUrl: achievement.imageUrl,
                        text: achievement.description,
                      });
                    }}
                    cardHighlight={
                      achievement.progress === 100 ? "achieved" : undefined
                    }
                    variant="small"
                  />
                );
              })}
            </Box>
          </>
        )}
      </Box>
    </PageRoot>
  );
};

export default UsersPage;
