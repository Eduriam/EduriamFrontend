"use client";

import {
  Chip,
  ContentContainer,
  Header,
  IconButton,
  LargeButton,
  PageRoot,
} from "@eduriam/ui-core";
import { PREMIUM_MESSAGES, getPremiumRoute } from "app/premium/premiumMessages";
import { useTranslation } from "i18n/client";
import { parseId } from "util/functions/api";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

import CertificateLockedDrawer from "components/courses/CertificateLockedDrawer/CertificateLockedDrawer";
import CourseCard from "components/courses/CourseCard/CourseCard";
import CourseDetailsDrawer from "components/courses/CourseDetailsDrawer/CourseDetailsDrawer";
import CourseLogo, {
  getVariantFromLogoId,
} from "components/courses/CourseLogo/CourseLogo";
import BackNavbar from "components/navigation/BackNavbar/BackNavbar";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { UserRole } from "infrastructure/api/generated/models";
import useAuth from "infrastructure/services/AuthProvider";
import {
  StudyPathProductSummary,
  StudyProductService,
  isLearningPathProduct,
} from "infrastructure/services/courses/StudyProductService";
import { UserProductsService } from "infrastructure/services/courses/UserProductsService";

export interface ILearningPathPage {}

const LearningPathPage: React.FC<ILearningPathPage> = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
  const router = useRouter();
  const { user } = useAuth();

  const params = useParams();
  const learningPathId = parseId(params?.learningPathId);

  const { product: studyPath } = StudyProductService.useProduct(
    learningPathId ?? 0,
  );

  useEffect(() => {
    if (learningPathId === undefined) {
      router.replace("/courses");
    }
  }, [learningPathId, router]);

  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [isCertificateDrawerOpen, setIsCertificateDrawerOpen] = useState(false);

  const isPremiumUser = user?.role === UserRole.PremiumUser;
  const premiumLabel = t("courses.premiumLabel");

  const shouldRedirectToPremiumBecauseNoEnergy =
    user && !isPremiumUser && (user.energy ?? 0) <= 0;
  const shouldRedirectToPremiumBecauseLearningPathLocked =
    Boolean(studyPath?.premium) && !isPremiumUser;

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

    await UserProductsService.enrollInProduct(learningPathId);
    navigateWithTransition(`/study?courseId=${learningPathId}`)();
  };

  const handleContinueLearning = () => {
    if (!studyPath?.upcomingLessonId) {
      return;
    }

    if (shouldRedirectToPremiumBecauseNoEnergy) {
      redirectToPremiumForNoEnergy();
      return;
    }

    navigateWithTransition(`/study?lessonId=${studyPath.upcomingLessonId}`)();
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

  const shortDescription = studyPath?.shortDescription;
  const description = studyPath?.description ?? undefined;
  const courses: StudyPathProductSummary[] = isLearningPathProduct(studyPath)
    ? studyPath.memberProducts
    : [];
  const isEnrolled = studyPath?.enrolled ?? false;
  const hasUpcomingLesson = Boolean(studyPath?.upcomingLessonId);
  const hasCertificate =
    studyPath?.userCertificate !== null &&
    studyPath?.userCertificate !== undefined;

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
      const certificateId = studyPath?.userCertificate;
      if (certificateId !== null && certificateId !== undefined) {
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
            <BackNavbar
              withTransition
              route="/courses"
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
                  {studyPath?.premium && (
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
                    getVariantFromLogoId(studyPath?.logoId ?? undefined) ??
                    "JavaScript"
                  }
                  size="large"
                />
                <Typography variant="h4">
                  {studyPath?.name ?? t("courses.unnamedCourse")}
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
                {courses.map((course: StudyPathProductSummary) => (
                  <CourseCard
                    key={course.id}
                    title={course.name}
                    icon={<CourseLogo variant="JavaScript" />}
                    enrolled={typeof course.userProgress === "number"}
                    premium={course.premium}
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
        prerequisites={studyPath?.prerequisites}
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
