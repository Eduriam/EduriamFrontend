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
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useState } from "react";

import { useParams } from "next/navigation";

import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

import CertificateLockedDrawer from "components/courses/CertificateLockedDrawer/CertificateLockedDrawer";
import ChapterCard from "components/courses/ChapterCard/ChapterCard";
import CourseDetailsDrawer from "components/courses/CourseDetailsDrawer/CourseDetailsDrawer";
import CourseLogo from "components/courses/CourseLogo/CourseLogo";

import CoursesAPI from "infrastructure/api/courses/CoursesAPI";
import UserCoursesAPI from "infrastructure/api/user/courses/UserCoursesAPI";

export interface ICoursePage {}

const CoursePage: React.FC<ICoursePage> = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();

  const params = useParams<{ courseId: Id }>();
  const courseId = params.courseId ?? "";

  const { course } = CoursesAPI.useCourse(courseId);

  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [isCertificateDrawerOpen, setIsCertificateDrawerOpen] = useState(false);

  const handleStartCourse = async () => {
    if (!courseId) {
      return;
    }

    await UserCoursesAPI.enrollInCourse(courseId);
    navigateWithTransition("/study-session")();
  };

  const handleContinueLearning = () => {
    navigateWithTransition("/lesson")();
  };

  const handleOpenDetails = () => {
    setIsDetailsDrawerOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsDrawerOpen(false);
  };

  const courseShortDescription = (
    course as unknown as { shortDescription?: string }
  )?.shortDescription;

  const courseDescription = (course as unknown as { description?: string })
    ?.description;

  const chapters = course?.chapters ?? [];

  const isEnrolled = course?.enrolled ?? false;

  return (
    <>
      <PageRoot data-test="course-page">
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
                <Chip
                  label={t("courses.courseLabel") || "Course"}
                  color="chipBlue"
                  variant="filled"
                />
                <IconButton
                  variant="text"
                  size="medium"
                  icon="certificate"
                  color="textPrimary"
                />
              </Stack>

              <Stack
                spacing={3}
                alignItems="center"
                data-test="course-description-section"
              >
                <CourseLogo variant="JavaScript" size="large" />
                <Typography variant="h4">
                  {course?.name ?? t("courses.unnamedCourse")}
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
              {isEnrolled && (
                <>
                  <LargeButton
                    variant="contained"
                    color="primary"
                    onClick={handleContinueLearning}
                    data-test="continue-learning-button"
                    fullWidth
                  >
                    {t("courses.continueLearning")}
                  </LargeButton>
                  <LargeButton
                    variant="outlined"
                    color="primary"
                    onClick={() => setIsCertificateDrawerOpen(true)}
                    data-test="certificate-button"
                    fullWidth
                  >
                    {t("courses.certificateButton")}
                  </LargeButton>
                </>
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
                {chapters.map((chapter, index) => (
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
                ))}
              </Stack>
            </Box>
          </Stack>
        </ContentContainer>
      </PageRoot>

      <CourseDetailsDrawer
        open={isDetailsDrawerOpen}
        onClose={handleCloseDetails}
        description={courseDescription}
        prerequisites={course?.prerequisites}
      />
      <CertificateLockedDrawer
        open={isCertificateDrawerOpen}
        onClose={() => setIsCertificateDrawerOpen(false)}
        data-test="certificate-locked-drawer"
        data-test-continue="certificate-locked-drawer-continue"
      />
    </>
  );
};

export default CoursePage;
