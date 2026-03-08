"use client";

import {
  BasicNavbar,
  ContentContainer,
  IconButton,
  LargeButton,
  PageRoot,
} from "@eduriam/ui-core";
import { buildShopAvatar } from "app/shop/utils/avatar";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Avatar from "components/avatar/Avatar";
import { getVariantFromLogoId } from "components/courses/CourseLogo/CourseLogo";

import { optimisticMutationOption } from "infrastructure/api/API";
import UserFollowingAPI from "infrastructure/api/user/following/UserFollowingAPI";
import UsersAPI from "infrastructure/api/users/UsersAPI";
import useAuth from "infrastructure/services/AuthProvider";

import AchievementBadge from "./components/AchievementBadge/AchievementBadge";
import CourseListItem from "./components/CourseListItem/CourseListItem";
import DayStreakCard from "./components/DayStreakCard/DayStreakCard";
import LeagueCard from "./components/LeagueCard/LeagueCard";

export interface IUsersPage {
  params: {
    userId: string;
  };
}

function resolveCourseLogoVariant(
  name: string,
  logoId?: string,
): "HTML" | "JavaScript" {
  const mapped = getVariantFromLogoId(logoId);

  if (mapped) {
    return mapped;
  }

  return name.toLowerCase().includes("javascript") ? "JavaScript" : "HTML";
}

const UsersPage: React.FC<IUsersPage> = ({ params }) => {
  const { userProfile, mutate } = UsersAPI.useUser(params.userId);
  const { user } = useAuth();
  const navigateWithTransition = useTransitionNavigationHandler();
  const { t } = useTranslation("common");

  const isOwnProfile = user?.id === params.userId;
  const achievements = userProfile?.achievements ?? [];
  const courses = userProfile?.courses ?? [];

  const handleFollowChange = (isFollowed: boolean) => {
    if (!userProfile || !user?.id) {
      return;
    }

    mutate(
      async () => {
        if (isFollowed) {
          await UserFollowingAPI.followUser(user.id, params.userId);
        } else {
          await UserFollowingAPI.unfollowUser(user.id, params.userId);
        }

        return { ...userProfile, isFollowed };
      },
      optimisticMutationOption({ ...userProfile, isFollowed }),
    );
  };

  return (
    <PageRoot data-test="user-page">
      <BasicNavbar
        leftButton={
          isOwnProfile
            ? {
                icon: "shop",
                onClick: navigateWithTransition("/shop"),
              }
            : undefined
        }
        rightButton={
          isOwnProfile
            ? {
                icon: "settings",
                onClick: navigateWithTransition("/settings"),
              }
            : undefined
        }
      />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        spacing={6}
        paddingTop="none"
      >
        {userProfile && (
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 5 }}
            data-test="user-profile-header-section"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
              data-test="user-avatar-section"
            >
              <Box
                role={isOwnProfile ? "button" : undefined}
                tabIndex={isOwnProfile ? 0 : undefined}
                onClick={
                  isOwnProfile
                    ? navigateWithTransition("/edit-avatar")
                    : undefined
                }
                onKeyDown={
                  isOwnProfile
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          navigateWithTransition("/edit-avatar")();
                        }
                      }
                    : undefined
                }
                sx={{ cursor: isOwnProfile ? "pointer" : "default" }}
                data-test={isOwnProfile ? "edit-avatar-button" : undefined}
              >
                <Avatar
                  definition={buildShopAvatar(userProfile.avatarDefinition)}
                  size={180}
                  alt={userProfile.name}
                />
              </Box>

              <Stack spacing={0.25} alignItems="center">
                <Typography variant="h6">{userProfile.name}</Typography>
                <Typography variant="body1" color="text.secondary">
                  @{userProfile.username}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={5}>
                <Typography
                  component="button"
                  type="button"
                  onClick={navigateWithTransition(
                    `/users/${params.userId}/followers`,
                  )}
                  sx={{
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                    color: "text.primary",
                    fontSize: "14px",
                    p: 0,
                  }}
                >
                  {`${userProfile.followers} ${t("userProfile.followers")}`}
                </Typography>
                <Typography
                  component="button"
                  type="button"
                  onClick={navigateWithTransition(
                    `/users/${params.userId}/followers?val=following`,
                  )}
                  sx={{
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                    color: "text.primary",
                    fontSize: "14px",
                    p: 0,
                  }}
                >
                  {`${userProfile.following} ${t("userProfile.following")}`}
                </Typography>
              </Stack>
            </Box>

            {isOwnProfile ? (
              <LargeButton
                variant="outlined"
                onClick={navigateWithTransition("/search")}
              >
                {t("userProfile.addFriends")}
              </LargeButton>
            ) : (
              <LargeButton
                variant="outlined"
                onClick={() => handleFollowChange(!userProfile.isFollowed)}
              >
                {userProfile.isFollowed
                  ? t("userProfile.userIsFollowing")
                  : t("userProfile.userIsNotFollowing")}
              </LargeButton>
            )}
          </Box>
        )}

        {userProfile && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography variant="h6">{t("userProfile.overview")}</Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              data-test="current-league-section"
            >
              <DayStreakCard streak={userProfile.streak} />
              <LeagueCard league={userProfile.league} />
            </Stack>
          </Box>
        )}

        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
          data-test="achievements-summary-section"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              {t("achievements.achievements")}
            </Typography>
            <IconButton
              icon="arrowRight"
              variant="text"
              color="textPrimary"
              onClick={navigateWithTransition(
                `/users/${params.userId}/achievements`,
              )}
              data-test="show-all-achievements-button"
            />
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            {achievements.slice(0, 5).map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                badgeIconName={achievement.badgeIconName}
                name={achievement.title}
                completed={
                  achievement.progress >= 100 || achievement.collectedReward
                }
              />
            ))}
          </Stack>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
          data-test="enrolled-courses-summary-section"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">{t("navigation.courses")}</Typography>
            <IconButton
              icon="arrowRight"
              variant="text"
              color="textPrimary"
              onClick={navigateWithTransition(
                `/users/${params.userId}/courses`,
              )}
              data-test="show-all-enrolled-courses-button"
            />
          </Stack>

          <Stack sx={{ width: "100%" }} spacing={3}>
            {courses.slice(0, 3).map((course, index, list) => (
              <Stack key={course.id} spacing={3}>
                <CourseListItem
                  courseId={course.id}
                  title={course.name}
                  progress={course.userProgress ?? 0}
                  variant={course.type}
                  logoVariant={resolveCourseLogoVariant(
                    course.name,
                    course.logoId,
                  )}
                />
                {index < list.length - 1 && <Divider />}
              </Stack>
            ))}
          </Stack>
        </Box>
      </ContentContainer>
    </PageRoot>
  );
};

export default UsersPage;
