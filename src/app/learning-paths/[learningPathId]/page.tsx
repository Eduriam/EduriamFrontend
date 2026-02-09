"use client";

import {
  BasicNavbar,
  Chip,
  ContentContainer,
  Header,
  LargeButton,
  PageRoot,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useState } from "react";

import { useParams } from "next/navigation";

import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

import CourseCard from "components/courses/CourseCard/CourseCard";
import CourseDetailsDrawer from "components/courses/CourseDetailsDrawer/CourseDetailsDrawer";
import CourseLogo, {
  getVariantFromLogoId,
} from "components/courses/CourseLogo/CourseLogo";

import LearningPathAPI from "infrastructure/api/learning-paths/LearningPathAPI";
import UserCoursesAPI from "infrastructure/api/user/courses/UserCoursesAPI";
import useAuth from "infrastructure/services/AuthProvider";

export interface ILearningPathPage {}

const LearningPathPage: React.FC<ILearningPathPage> = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
  const { user } = useAuth();

  const params = useParams<{ learningPathId: Id }>();
  const learningPathId = params.learningPathId ?? "";

  const { learningPath } = LearningPathAPI.useLearningPath(learningPathId);

  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);

  const handleStartLearningPath = async () => {
    if (!learningPathId) {
      return;
    }

    await UserCoursesAPI.enrollInCourse(learningPathId);
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

  const shortDescription = learningPath?.shortDescription;
  const description = learningPath?.description;
  const courses = learningPath?.courses ?? [];

  const isEnrolled =
    (learningPath?.enrolled ?? false) ||
    user?.selectedLearningPath?.id === learningPathId;

  return (
    <>
      <PageRoot data-test="learning-path-page">
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
                  label={t("courses.learningPathLabel") || "Learning path"}
                  color="chipBlue"
                  variant="filled"
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
              {isEnrolled && (
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
                {courses.map((course, index) => (
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
    </>
  );
};

export default LearningPathPage;
