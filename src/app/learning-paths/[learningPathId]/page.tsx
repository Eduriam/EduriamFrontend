"use client";

import {
  BasicNavbar,
  Chip,
  ContentContainer,
  Header,
  IconButton,
  LargeButton,
  PageRoot,
} from "@eduriam/ui-core";
import { PREMIUM_MESSAGES, getPremiumRoute } from "app/premium/premiumMessages";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useState } from "react";

import { useParams } from "next/navigation";

import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

import CertificateLockedDrawer from "components/courses/CertificateLockedDrawer/CertificateLockedDrawer";
import CourseCard from "components/courses/CourseCard/CourseCard";
import CourseDetailsDrawer from "components/courses/CourseDetailsDrawer/CourseDetailsDrawer";
import CourseLogo, {
  getVariantFromLogoId,
} from "components/courses/CourseLogo/CourseLogo";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { LearningPath } from "infrastructure/api/courses/Courses";
import CoursesAPI from "infrastructure/api/courses/CoursesAPI";
import UserCoursesAPI from "infrastructure/api/users/me/courses/UserCoursesAPI";
import useAuth from "infrastructure/services/AuthProvider";

export interface ILearningPathPage {}

const LearningPathPage: React.FC<ILearningPathPage> = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
  const { user } = useAuth();

  const params = useParams<{ learningPathId: Id }>();
  const learningPathId = params.learningPathId ?? "";

  const { course: learningPath } = CoursesAPI.useCourse(learningPathId);

  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [isCertificateDrawerOpen, setIsCertificateDrawerOpen] = useState(false);

  const isPremiumUser = user?.role === "PREMIUM_USER";
  const premiumLabel = t("courses.premiumLabel");

  const shouldRedirectToPremiumBecauseNoEnergy =
    user && !isPremiumUser && (user.energy ?? 0) <= 0;
  const shouldRedirectToPremiumBecauseLearningPathLocked =
    Boolean(learningPath?.premium) && !isPremiumUser;

  const redirectToPremiumForNoEnergy = () => {
    navigateWithTransition(getPremiumRoute(PREMIUM_MESSAGES.noEnergyLeft))();
  };
  const redirectToPremiumForLearningPathLocked = () => {
    navigateWithTransition(
      getPremiumRoute(PREMIUM_MESSAGES.learningPathLocked),
    )();
  };

  const handleStartLearningPath = async () => {
    if (!learningPathId) {
      return;
    }

    if (shouldRedirectToPremiumBecauseLearningPathLocked) {
      redirectToPremiumForLearningPathLocked();
      return;
    }

    if (shouldRedirectToPremiumBecauseNoEnergy) {
      redirectToPremiumForNoEnergy();
      return;
    }

    await UserCoursesAPI.enrollInCourse(learningPathId);
    navigateWithTransition(`/study?courseId=${learningPathId}`)();
  };

  const handleContinueLearning = () => {
    if (!learningPath?.upcomingLessonId) {
      return;
    }

    if (shouldRedirectToPremiumBecauseNoEnergy) {
      redirectToPremiumForNoEnergy();
      return;
    }

    navigateWithTransition(
      `/study?lessonId=${learningPath.upcomingLessonId}`,
    )();
  };

  const handleReviewLearningPath = () => {
    if (!learningPathId) {
      return;
    }

    if (shouldRedirectToPremiumBecauseNoEnergy) {
      redirectToPremiumForNoEnergy();
      return;
    }

    navigateWithTransition(`/review?courseId=${learningPathId}`)();
  };

  const handleOpenDetails = () => {
    setIsDetailsDrawerOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsDrawerOpen(false);
  };

  const shortDescription = learningPath?.shortDescription;
  const description = learningPath?.description;
  const courses = (learningPath as LearningPath)?.courses ?? [];
  const isEnrolled = learningPath?.enrolled ?? false;
  const hasUpcomingLesson = Boolean(learningPath?.upcomingLessonId);
  const hasCertificate = learningPath?.userCertificate !== null;

  const handleViewCertificate = () => {
    if (!learningPathId) {
      return;
    }

    // Non-premium users are redirected to the premium benefits page.
    if (!isPremiumUser) {
      navigateWithTransition(
        getPremiumRoute(PREMIUM_MESSAGES.certificateLocked),
      )();
      return;
    }

    // Premium users with a certificate go directly to the certificate page.
    if (hasCertificate) {
      const certificateId =
        learningPath?.userCertificate ??
        ("react-developer-path-certificate" as Id);
      if (certificateId) {
        navigateWithTransition(`/certificates/${certificateId}`)();
        return;
      }
    }

    // Premium users without an available certificate see the locked drawer.
    setIsCertificateDrawerOpen(true);
  };

  return (
    <>
      <PageRoot data-test="learning-path-page">
        <PageNavigation
          topNavigation={
            <BasicNavbar
              leftButton={{
                icon: "chevronLeft",
                onClick: navigateWithTransition("/courses", {
                  direction: "back",
                }),
              }}
              rightButton={{
                icon: "info",
                onClick: handleOpenDetails,
                dataTest: "information-button",
              }}
            />
          }
          mainNavigation="hidden"
        />
        <ContentContainer
          width="small"
          justifyContent="flex-start"
          paddingTop="none"
        >
          <Stack spacing={8} sx={{ width: "100%" }}>
            <Stack spacing={8}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Chip
                    label={t("courses.learningPathLabel") || "Learning path"}
                    color="chipBlue"
                    variant="filled"
                  />
                  {learningPath?.premium && (
                    <Chip
                      label={premiumLabel}
                      color="chipYellow"
                      variant="filled"
                    />
                  )}
                </Stack>
                <IconButton
                  variant="text"
                  size="medium"
                  icon="certificate"
                  color="textPrimary"
                  data-test="view-certificate-button"
                  onClick={handleViewCertificate}
                />
              </Stack>

              <Stack
                spacing={3}
                alignItems="center"
                data-test="learning-path-description-section"
              >
                <CourseLogo
                  variant={
                    getVariantFromLogoId(learningPath?.logoId) ?? "JavaScript"
                  }
                  size="large"
                />
                <Typography variant="h4">
                  {learningPath?.name ?? t("courses.unnamedCourse")}
                </Typography>
                {shortDescription && (
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                  >
                    {shortDescription}
                  </Typography>
                )}
              </Stack>
            </Stack>

            <Stack direction="column" spacing={2}>
              {!isEnrolled && (
                <LargeButton
                  variant="contained"
                  color="primary"
                  onClick={handleStartLearningPath}
                  data-test="start-learning-path-button"
                  fullWidth
                >
                  {t("courses.startLearningPath")}
                </LargeButton>
              )}
              {isEnrolled && hasUpcomingLesson && (
                <LargeButton
                  variant="contained"
                  color="primary"
                  onClick={handleContinueLearning}
                  data-test="continue-learning-path-button"
                  fullWidth
                >
                  {t("courses.continueLearning")}
                </LargeButton>
              )}
              {isEnrolled && !hasUpcomingLesson && (
                <LargeButton
                  variant="contained"
                  color="primary"
                  onClick={handleReviewLearningPath}
                  data-test="review-learning-path-button"
                  fullWidth
                >
                  {t("courses.reviewLearningPath") ||
                    t("courses.reviewCourse") ||
                    "Review learning path"}
                </LargeButton>
              )}
            </Stack>

            <Box
              sx={{ width: "100%", position: "relative" }}
              data-test="learning-path-courses-list-section"
            >
              <Header
                variant="section"
                text={t("courses.learningPathCourses") || "Courses"}
              />
              {courses.length > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    left: 32,
                    top: 64,
                    bottom: 16,
                    width: 4,
                    bgcolor: "divider",
                    borderRadius: 999,
                    transform: "translateX(-50%)",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />
              )}
              <Stack
                spacing={2}
                sx={{ mt: 2, position: "relative", zIndex: 1 }}
              >
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    title={course.name}
                    icon={
                      <CourseLogo
                        variant={
                          getVariantFromLogoId(course.logoId) ?? "JavaScript"
                        }
                      />
                    }
                    enrolled={typeof course.userProgress === "number"}
                    premium={Boolean(course.premium)}
                    premiumLabel={premiumLabel}
                    progress={course.userProgress ?? 0}
                    onClick={navigateWithTransition(`/courses/${course.id}`)}
                    data-test="learning-path-course-card"
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </ContentContainer>
      </PageRoot>

      <CourseDetailsDrawer
        open={isDetailsDrawerOpen}
        onClose={handleCloseDetails}
        description={description}
        prerequisites={learningPath?.prerequisites}
        data-test="learning-path-details-drawer"
      />
      <CertificateLockedDrawer
        open={isCertificateDrawerOpen}
        onClose={() => setIsCertificateDrawerOpen(false)}
        data-test="certificate-locked-drawer"
        data-test-continue="continue-button"
      />
    </>
  );
};

export default LearningPathPage;
