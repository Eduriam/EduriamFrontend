import { useTranslation } from "i18n/client";

import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Popup, { IPopup } from "components/atoms/Popup/Popup";
import ProgressCard from "components/atoms/cards/ProgressCard/ProgressCard";

import { Achievement } from "infrastructure/api/user/achievements/Achievements";
import AchievementsAPI from "infrastructure/api/user/achievements/AchievementsAPI";
import { Challenge } from "infrastructure/api/user/active-challenges/ActiveChallenges";
import ActiveChallengesAPI from "infrastructure/api/user/active-challenges/ActiveChallengesAPI";
import mutateArrayItem from "infrastructure/api/utils/mutateArrayItem";
import useAuth from "infrastructure/services/AuthProvider";

export interface IChallengesOverview {}

const ChallengesOverview: React.FC<IChallengesOverview> = () => {
  const { challenges, mutate: mutateChallenges } =
    ActiveChallengesAPI.useChallenges();
  const { achievements, mutate } = AchievementsAPI.useAchievements({
    userId: useAuth().user?.id,
  });

  const { t } = useTranslation("common");
  const [popup, setPopup] = useState<IPopup | null>(null);

  function updateChallenge(id: Id, change: Partial<Challenge>) {
    mutateArrayItem(challenges, id, change, mutateChallenges, (params) =>
      ActiveChallengesAPI.collectReward(params),
    );
  }

  function updateAchievement(id: Id, change: Partial<Achievement>) {
    mutateArrayItem(achievements, id, change, mutate, (params) =>
      AchievementsAPI.collectReward(params),
    );
  }

  return (
    <>
      {popup && <Popup {...popup} open={true} onClose={() => setPopup(null)} />}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography variant="subtitle1">
            {t("challenges.monthlyChallenge")}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {challenges &&
              challenges.map((challenge) => {
                return (
                  <ProgressCard
                    key={challenge.id}
                    header={challenge.title}
                    subheader={challenge.description}
                    imageUrl={challenge.imageUrl}
                    claimReward={!challenge.collectedReward}
                    progress={challenge.progress}
                    onRewardClick={() => {
                      updateChallenge(challenge.id, { collectedReward: true });
                    }}
                    onClick={() => {
                      setPopup({
                        displayCloseButton: true,
                        subheader: challenge.title,
                        imageUrl: challenge.imageUrl,
                        text: challenge.description,
                      });
                    }}
                    cardHighlight={
                      challenge.progress === 100 && challenge.collectedReward
                        ? "achieved"
                        : undefined
                    }
                  />
                );
              })}
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1">
            {t("achievements.achievements")}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {achievements &&
              achievements.map((achievement) => {
                return (
                  <ProgressCard
                    key={achievement.id}
                    header={achievement.title}
                    subheader={achievement.description}
                    imageUrl={achievement.imageUrl}
                    claimReward={!achievement.collectedReward}
                    progress={achievement.progress}
                    onRewardClick={() => {
                      updateAchievement(achievement.id, {
                        collectedReward: true,
                      });
                    }}
                    onClick={() => {
                      setPopup({
                        displayCloseButton: true,
                        subheader: achievement.title,
                        imageUrl: achievement.imageUrl,
                        text: achievement.description,
                      });
                    }}
                    cardHighlight={
                      achievement.progress === 100 &&
                      achievement.collectedReward
                        ? "achieved"
                        : undefined
                    }
                    variant="small"
                  />
                );
              })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChallengesOverview;
