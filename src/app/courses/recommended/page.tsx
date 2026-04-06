"use client";

import type { Id } from "domain/models/types/core";

import {
  BasicNavbar,
  ContentContainer,
  Header,
  LargeButton,
  PageRoot,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import CourseCard from "components/courses/CourseCard/CourseCard";
import CourseLogo, {
  getVariantFromLogoId,
} from "components/courses/CourseLogo/CourseLogo";
import LearningPathCard from "components/courses/LearningPathCard/LearningPathCard";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import RecommendedCoursesAPI from "infrastructure/api/users/me/recommended-courses/RecommendedCoursesAPI";
import { CourseDTO } from "infrastructure/services/courses/CoursesService";

function getCourseLogoVariant(course: CourseDTO): "HTML" | "JavaScript" {
  const name = course.name?.toLowerCase() ?? "";
  return name.includes("javascript") ? "JavaScript" : "HTML";
}

function CourseOrLearningPathCard({
  course,
  dataTestCourse,
  dataTestLearningPath,
  onSelect,
  premiumLabel,
}: {
  course: CourseDTO;
  dataTestCourse?: string;
  dataTestLearningPath?: string;
  onSelect: (courseId: Id, isLearningPath: boolean) => void;
  premiumLabel: string;
}) {
  const icon = (
    <CourseLogo
      variant={
        getVariantFromLogoId(course.logoId) ?? getCourseLogoVariant(course)
      }
    />
  );
  const isLearningPath = course.type === "learning-path";
  const dataTest = isLearningPath ? dataTestLearningPath : dataTestCourse;
  const handleClick = () => onSelect(course.id, isLearningPath);
  const enrolled = typeof course.userProgress === "number";
  const progress = course.userProgress ?? 0;

  if (isLearningPath) {
    return (
      <Box data-test={dataTest}>
        <LearningPathCard
          title={course.name}
          icon={icon}
          enrolled={enrolled}
          premium={Boolean(course.premium)}
          premiumLabel={premiumLabel}
          progress={progress}
          onClick={handleClick}
        />
      </Box>
    );
  }
  return (
    <Box data-test={dataTest}>
      <CourseCard
        title={course.name}
        icon={icon}
        enrolled={enrolled}
        premium={Boolean(course.premium)}
        premiumLabel={premiumLabel}
        progress={progress}
        onClick={handleClick}
      />
    </Box>
  );
}

const RecommendedCoursesPage: React.FC = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();

  const { recommendedCourses } = RecommendedCoursesAPI.useRecommendedCourses();
  const displayRecommended = recommendedCourses ?? [];
  const premiumLabel = t("courses.premiumLabel");

  const handleCourseSelect = (courseId: Id, isLearningPath: boolean) => {
    const path = isLearningPath
      ? `/learning-paths/${courseId}`
      : `/courses/${courseId}`;
    navigateWithTransition(path)();
  };

  return (
    <PageRoot data-test="recommendations-page">
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backgroundColor: "background.default",
        }}
      >
        <PageNavigation
          topNavigation={
            <BasicNavbar
              leftButton={{
                icon: "arrowLeft",
                onClick: navigateWithTransition("/courses", {
                  direction: "back",
                }),
              }}
            />
          }
          mainNavigation="hidden"
        />
      </Box>
      <ContentContainer width="small" justifyContent="flex-start" spacing={10}>
        <Stack
          spacing={3}
          data-test="recommended-courses-and-learning-paths-section"
        >
          <Header variant="section" text={t("courses.recommended")} />
          <Stack direction="column" spacing={3}>
            {displayRecommended.map((course) => (
              <CourseOrLearningPathCard
                key={course.id}
                course={course}
                dataTestCourse="recommended-course-card"
                dataTestLearningPath="recommended-learning-path-card"
                onSelect={handleCourseSelect}
                premiumLabel={premiumLabel}
              />
            ))}
          </Stack>
        </Stack>
        <Box sx={{ pt: 2 }}>
          <LargeButton
            data-test="retake-recommendation-quiz-button"
            onClick={() =>
              navigateWithTransition("/courses/recommended/quiz")()
            }
            variant="outlined"
            fullWidth
          >
            {t("courses.retakeRecommendationQuiz")}
          </LargeButton>
        </Box>
      </ContentContainer>
    </PageRoot>
  );
};

export default RecommendedCoursesPage;

