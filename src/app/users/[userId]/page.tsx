"use client";

import {
  BasicNavbar,
  ContentContainer,
  IconButton,
  LargeButton,
  PageRoot,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import theme from "styles/theme";
import { parseRequiredId } from "util/functions/api";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import { BOTTOM_NAV_BAR_HEIGHT } from "components/atoms/navigation/main-navigation-bars/BottomNavigationBar/BottomNavigationBar";
import Avatar from "components/avatar/Avatar";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { optimisticMutationOption } from "infrastructure/api/API";
import useAuth from "infrastructure/services/AuthProvider";
import { UserService } from "infrastructure/services/users/UserService";
import { UsersService } from "infrastructure/services/users/UsersService";

import AchievementBadge from "./components/AchievementBadge/AchievementBadge";
import CourseListItem from "./components/CourseListItem/CourseListItem";
import DayStreakCard from "./components/DayStreakCard/DayStreakCard";
import LeagueCard from "./components/LeagueCard/LeagueCard";
import {
  isAchievementCompleted,
  toAchievementBadgeIconName,
  toAchievementTitleKey,
} from "./util/achievementUtils";

export interface IUsersPage {
  params: {
    userId: string;
  };
}

const UsersPage: React.FC<IUsersPage> = ({ params }) => {
  const router = useRouter();
  const userId = parseRequiredId(params.userId);
  const safeUserId = userId ?? 0;
  const { userProfile, mutate } = UsersService.useUser(safeUserId);
  const { user } = useAuth();
  const navigateWithTransition = useTransitionNavigationHandler();
  const { t } = useTranslation("common");
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isOwnProfile = userId !== null && user?.id === userId;
  const maxAchievementsToDisplay = mobile ? 3 : 4;
  const achievements = userProfile?.achievements ?? [];
  const courses = userProfile?.courses ?? [];

  useEffect(() => {
    if (userId === null) {
      router.replace("/");
    }
  }, [router, userId]);

  const handleFollowChange = (isFollowed: boolean) => {
    if (!userProfile || !user?.id || userId === null) {
      return;
    }

    mutate(
      async () => {
        if (isFollowed) {
          await UserService.followUser(userId);
        } else {
          await UserService.unfollowUser(userId);
        }

        return { ...userProfile, isFollowed };
      },
      optimisticMutationOption({ ...userProfile, isFollowed }),
    );
  };

  return (
    <PageRoot data-test="user-page">
      <PageNavigation
        topNavigation={
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
        }
        mainNavigation="show"
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
                  definition={userProfile.avatar}
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
                    `/users/${safeUserId}/followers`,
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
                    `/users/${safeUserId}/followers?val=following`,
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
            component="button"
            type="button"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            onClick={navigateWithTransition(`/users/${safeUserId}/achievements`)}
            sx={{
              width: "100%",
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              color: "inherit",
            }}
          >
            <Typography variant="h6">
              {t("achievements.achievements")}
            </Typography>
            <IconButton
              icon="arrowRight"
              variant="text"
              color="textPrimary"
              data-test="show-all-achievements-button"
            />
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            {achievements
              .slice(0, maxAchievementsToDisplay)
              .map((achievement) => (
                <AchievementBadge
                  key={achievement.achievementId}
                  badgeIconName={toAchievementBadgeIconName(achievement.type)}
                  name={t(toAchievementTitleKey(achievement.type))}
                  completed={isAchievementCompleted(achievement)}
                />
              ))}
          </Stack>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
          data-test="enrolled-courses-summary-section"
        >
          <Stack
            component="button"
            type="button"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            onClick={navigateWithTransition(`/users/${safeUserId}/courses`)}
            sx={{
              width: "100%",
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              color: "inherit",
            }}
          >
            <Typography variant="h6">{t("navigation.courses")}</Typography>
            <IconButton
              icon="arrowRight"
              variant="text"
              color="textPrimary"
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
                  logoVariant={course.logoId}
                />
                {index < list.length - 1 && <Divider />}
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Bottom padding to avoid the bottom navigation bar from covering the content */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            height: `calc(${BOTTOM_NAV_BAR_HEIGHT}px + env(safe-area-inset-bottom))`,
          }}
        />
      </ContentContainer>
    </PageRoot>
  );
};

export default UsersPage;
