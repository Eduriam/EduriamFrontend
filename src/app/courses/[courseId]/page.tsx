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
import { parseId } from "util/functions/api";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

import CertificateLockedDrawer from "components/courses/CertificateLockedDrawer/CertificateLockedDrawer";
import ChapterCard from "components/courses/ChapterCard/ChapterCard";
import CourseDetailsDrawer from "components/courses/CourseDetailsDrawer/CourseDetailsDrawer";
import CourseLogo from "components/courses/CourseLogo/CourseLogo";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { UserRole } from "infrastructure/api/generated/models";
import useAuth from "infrastructure/services/AuthProvider";
import {
  CourseProduct,
  isCourseProduct,
  StudyProductChapterSummary,
  StudyProductService,
} from "infrastructure/services/courses/StudyProductService";
import { UserProductsService } from "infrastructure/services/courses/UserProductsService";

export interface ICoursePage {}

const CoursePage: React.FC<ICoursePage> = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
  const router = useRouter();
  const { user } = useAuth();

  const params = useParams();
  const courseId = parseId(params?.courseId);

  const { product } = StudyProductService.useProduct(courseId ?? 0);

  useEffect(() => {
    if (courseId === undefined) {
      router.replace("/courses");
    }
  }, [courseId, router]);

  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [isCertificateDrawerOpen, setIsCertificateDrawerOpen] = useState(false);

  const isPremiumUser = user?.role === UserRole.PremiumUser;
  const hasCertificate =
    product?.userCertificate !== null && product?.userCertificate !== undefined;
  const premiumLabel = t("courses.premiumLabel");

  const shouldRedirectToPremiumBecauseNoEnergy =
    user && !isPremiumUser && (user.energy ?? 0) <= 0;
  const shouldRedirectToPremiumBecauseCourseLocked =
    Boolean(product?.premium) && !isPremiumUser;

  const redirectToPremiumForNoEnergy = () => {
    navigateWithTransition(getPremiumRoute(PREMIUM_MESSAGES.noEnergyLeft))();
  };
  const redirectToPremiumForCourseLocked = () => {
    navigateWithTransition(getPremiumRoute(PREMIUM_MESSAGES.courseLocked))();
  };

  const handleStartCourse = async () => {
    if (!courseId) {
      return;
    }

    if (shouldRedirectToPremiumBecauseCourseLocked) {
      redirectToPremiumForCourseLocked();
      return;
    }

    if (shouldRedirectToPremiumBecauseNoEnergy) {
      redirectToPremiumForNoEnergy();
      return;
    }

    await UserProductsService.enrollInProduct(courseId);
    navigateWithTransition(`/study?courseId=${courseId}`)();
  };

  const handleContinueLearning = () => {
    if (shouldRedirectToPremiumBecauseNoEnergy) {
      redirectToPremiumForNoEnergy();
      return;
    }

    navigateWithTransition(`/study?lessonId=${product?.upcomingLessonId}`)();
  };

  const handleReviewCourse = () => {
    if (!courseId) {
      return;
    }

    if (shouldRedirectToPremiumBecauseNoEnergy) {
      redirectToPremiumForNoEnergy();
      return;
    }

    navigateWithTransition(`/review?courseId=${courseId}`)();
  };

  const handleViewCertificate = () => {
    if (!courseId) {
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
      const certificateId = product?.userCertificate;
      if (certificateId !== null && certificateId !== undefined) {
        navigateWithTransition(`/certificates/${certificateId}`)();
        return;
      }
    }

    // Premium users without an available certificate see the locked drawer.
    setIsCertificateDrawerOpen(true);
  };

  const handleOpenDetails = () => {
    setIsDetailsDrawerOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsDrawerOpen(false);
  };

  const courseShortDescription = product?.shortDescription;
  const courseDescription = product?.description ?? undefined;
  const chapters: NonNullable<CourseProduct["chapters"]> = isCourseProduct(product)
    ? product.chapters
    : [];

  const isEnrolled = product?.enrolled ?? false;
  const hasUpcomingLesson = Boolean(product?.upcomingLessonId);

  return (
    <>
      <PageRoot data-test="course-page">
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
                    label={t("courses.courseLabel") || "Course"}
                    color="chipBlue"
                    variant="filled"
                  />
                  {product?.premium && (
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
                data-test="course-description-section"
              >
                <CourseLogo variant="JavaScript" size="large" />
                <Typography variant="h4">
                  {product?.name ?? t("courses.unnamedCourse")}
                </Typography>
                {courseShortDescription && (
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                  >
                    {courseShortDescription}
                  </Typography>
                )}
              </Stack>
            </Stack>

            <Stack direction="column" spacing={2}>
              {!isEnrolled && (
                <LargeButton
                  variant="contained"
                  color="primary"
                  onClick={handleStartCourse}
                  data-test="start-course-button"
                  fullWidth
                >
                  {t("courses.startCourse")}
                </LargeButton>
              )}
              {isEnrolled && hasUpcomingLesson && (
                <LargeButton
                  variant="contained"
                  color="primary"
                  onClick={handleContinueLearning}
                  data-test="continue-learning-button"
                  fullWidth
                >
                  {t("courses.continueLearning")}
                </LargeButton>
              )}
              {isEnrolled && !hasUpcomingLesson && (
                <LargeButton
                  variant="contained"
                  color="primary"
                  onClick={handleReviewCourse}
                  data-test="review-course-button"
                  fullWidth
                >
                  {t("courses.reviewCourse") || "Review course"}
                </LargeButton>
              )}
            </Stack>

            <Box
              sx={{ width: "100%", position: "relative" }}
              data-test="chapters-list-section"
            >
              <Header variant="section" text={t("courses.chapters") || ""} />
              {chapters.length > 0 && (
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
                {chapters.map(
                  (chapter: StudyProductChapterSummary, index: number) => (
                  <ChapterCard
                    key={chapter.id}
                    title={chapter.name}
                    subtitle={t("courses.chapterNumber", {
                      index: index + 1,
                    })}
                    progress={chapter.userProgress ?? 0}
                    onClick={navigateWithTransition(
                      `/courses/${courseId}/chapters/${chapter.id}`,
                    )}
                    data-test="chapter-card"
                  />
                  ),
                )}
              </Stack>
            </Box>
          </Stack>
        </ContentContainer>
      </PageRoot>

      <CourseDetailsDrawer
        open={isDetailsDrawerOpen}
        onClose={handleCloseDetails}
        description={courseDescription}
        prerequisites={product?.prerequisites}
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

export default CoursePage;
