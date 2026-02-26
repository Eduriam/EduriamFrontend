"use client";

import {
  ContentContainer,
  LargeButton,
  PageRoot,
  Tabs,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import StudyPlanAPI from "infrastructure/api/user/study-plan/StudyPlanAPI";
import useAuth from "infrastructure/services/AuthProvider";

import EnergyDrawer from "./components/EnergyDrawer/EnergyDrawer";
import HomepageNavbar from "./components/HomepageNavbar/HomepageNavbar";
import StreakDrawer from "./components/StreakDrawer/StreakDrawer";
import StudyPreview from "./components/StudyPreview/StudyPreview";

export interface IHomePage {}

type HomeTab = "learn" | "review";

const MAX_STREAK_FREEZES = 2;
const MAX_ENERGY_POINTS = 40;

const HomePage: React.FC<IHomePage> = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<HomeTab>("learn");
  const [streakDrawerOpen, setStreakDrawerOpen] = useState(false);
  const [energyDrawerOpen, setEnergyDrawerOpen] = useState(false);

  const { studyPlan, isLoading } = StudyPlanAPI.useStudyPlan();

  const streak = user?.streak ?? 0;
  const coins = user?.balance ?? 0;
  const energy = user?.energy ?? 0;
  const equippedStreakFreezes = user?.equippedStreakFreezes ?? 0;

  const hasUpcomingLesson = !!studyPlan?.upcomingLearnLesson;
  const hasReviewContent = !!studyPlan?.upcomingReviewCourse;

  const tabs = useMemo(
    () => [
      { label: t("home.learnTab") ?? "Learn", value: "learn" },
      { label: t("home.reviewTab") ?? "Review", value: "review" },
    ],
    [t],
  );

  const handleTabChange = (value: string | number) => {
    if (value === "learn" || value === "review") {
      setActiveTab(value);
    }
  };

  return (
    <PageRoot data-test="home-page">
      <HomepageNavbar
        streak={streak}
        coins={coins}
        energy={energy}
        onStudyPlanClick={navigateWithTransition("/study-plan")}
        onStreakClick={() => setStreakDrawerOpen(true)}
        onCoinsClick={navigateWithTransition("/shop")}
        onEnergyClick={() => setEnergyDrawerOpen(true)}
        data-test-study-plan-button="study-plan-button"
      />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        spacing={10}
        paddingTop="none"
      >
        <Tabs
          tabs={tabs}
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
        />
        <Box sx={{ width: "100%", mt: 6 }}>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                pointerEvents: "none",
              }}
            >
              <Box
                component="button"
                type="button"
                onClick={() => setActiveTab("learn")}
                sx={{
                  pointerEvents: "auto",
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              />
              <Box
                component="button"
                type="button"
                data-test="review-tab-button"
                onClick={() => setActiveTab("review")}
                sx={{
                  pointerEvents: "auto",
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            </Box>
          </Box>
        </Box>

        {activeTab === "learn" && (
          <Stack
            spacing={8}
            alignItems="center"
            sx={{ width: "100%" }}
            data-test="upcoming-lesson-section"
            flexDirection="column"
          >
            {!isLoading && hasUpcomingLesson && (
              <>
                <StudyPreview
                  title={
                    studyPlan?.upcomingLearnLesson?.title ??
                    "HTML for Beginners"
                  }
                  description={
                    t("home.nextStudyPlanLesson") ?? "Next study plan lesson."
                  }
                  imageSrc={studyPlan?.upcomingLearnLesson?.thumbnailUrl}
                />

                <LargeButton
                  fullWidth
                  onClick={navigateWithTransition(
                    `/study?lessonId=${studyPlan?.upcomingLearnLesson?.id}`,
                  )}
                  data-test="start-upcoming-lesson-button"
                >
                  {t("home.startLesson") ?? "Start Lesson"}
                </LargeButton>
              </>
            )}

            {!isLoading && !hasUpcomingLesson && (
              <>
                <Stack
                  spacing={3}
                  alignItems="center"
                  textAlign="center"
                  sx={{ width: "100%" }}
                  data-test="all-lessons-completed-section"
                >
                  <Typography variant="h4">
                    {t("home.allLessonsLearnedTitle") ?? "All lessons learned!"}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {t("home.allLessonsLearnedSubtitle") ??
                      "Start a new course to learn more lessons"}
                  </Typography>
                </Stack>
                <LargeButton
                  fullWidth
                  onClick={navigateWithTransition("/courses")}
                  data-test="browse-courses-button"
                >
                  {t("home.browseCourses") ?? "Browse Courses"}
                </LargeButton>
              </>
            )}
          </Stack>
        )}

        {activeTab === "review" && (
          <Stack
            spacing={8}
            alignItems="center"
            sx={{ width: "100%" }}
            data-test="review-section"
          >
            {!isLoading && hasReviewContent && (
              <>
                <StudyPreview
                  title={
                    studyPlan?.upcomingReviewCourse?.title ??
                    "Fullstack Developer"
                  }
                  description={
                    t("home.reviewDescription") ??
                    "Review the most important concepts carefully selected for you."
                  }
                  imageSrc={studyPlan?.upcomingReviewCourse?.thumbnailUrl}
                />
                <LargeButton
                  fullWidth
                  onClick={navigateWithTransition(
                    `/review?courseId=${studyPlan?.upcomingReviewCourse?.id}`,
                  )}
                  data-test="start-review-button"
                >
                  {t("home.startReview") ?? "Start Review"}
                </LargeButton>
              </>
            )}

            {!isLoading && !hasReviewContent && (
              <Stack
                spacing={3}
                alignItems="center"
                textAlign="center"
                sx={{ width: "100%" }}
                data-test="no-content-to-review-section"
              >
                <Typography variant="h4">
                  {t("home.allLessonsReviewedTitle") ?? "All lessons reviewed!"}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {t("home.allLessonsReviewedSubtitle") ?? "Come back later."}
                </Typography>
              </Stack>
            )}
          </Stack>
        )}
      </ContentContainer>

      <StreakDrawer
        open={streakDrawerOpen}
        onClose={() => setStreakDrawerOpen(false)}
        streakDays={streak}
        equippedStreakFreezes={equippedStreakFreezes}
        maxStreakFreezes={MAX_STREAK_FREEZES}
        data-test="streak-drawer"
      />
      <EnergyDrawer
        open={energyDrawerOpen}
        onClose={() => setEnergyDrawerOpen(false)}
        pointsLeft={energy}
        progressValue={
          MAX_ENERGY_POINTS > 0
            ? Math.min(100, (energy / MAX_ENERGY_POINTS) * 100)
            : 0
        }
        onUnlockUnlimited={() => {
          setEnergyDrawerOpen(false);
          navigateWithTransition("/premium");
        }}
        data-test="energy-drawer"
        data-test-unlock="unlock-unlimited-energy-button"
      />
    </PageRoot>
  );
};

export default HomePage;
