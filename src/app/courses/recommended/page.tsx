"use client";

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

import CareerPathCard from "components/courses/CareerPathCard/CareerPathCard";
import CourseCard from "components/courses/CourseCard/CourseCard";
import CourseLogo, {
  getVariantFromLogoId,
} from "components/courses/CourseLogo/CourseLogo";

import type { Course } from "infrastructure/api/courses/Courses";
import RecommendedCoursesAPI from "infrastructure/api/user/courses/recommended-courses/RecommendedCoursesAPI";

function getCourseLogoVariant(course: Course): "HTML" | "JavaScript" {
  const name = course.name?.toLowerCase() ?? "";
  return name.includes("javascript") ? "JavaScript" : "HTML";
}

function CourseOrCareerPathCard({
  course,
  dataTestCourse,
  dataTestCareerPath,
  onSelect,
}: {
  course: Course;
  dataTestCourse?: string;
  dataTestCareerPath?: string;
  onSelect: (courseId: Id, isCareerPath: boolean) => void;
}) {
  const icon = (
    <CourseLogo
      variant={
        getVariantFromLogoId(course.logoId) ?? getCourseLogoVariant(course)
      }
    />
  );
  const isCareerPath = course.type === "career-path";
  const dataTest = isCareerPath ? dataTestCareerPath : dataTestCourse;
  const handleClick = () => onSelect(course.id, isCareerPath);
  const enrolled = typeof course.userProgress === "number";
  const progress = course.userProgress ?? 0;

  if (isCareerPath) {
    return (
      <Box data-test={dataTest}>
        <CareerPathCard
          title={course.name}
          icon={icon}
          enrolled={enrolled}
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

  const handleCourseSelect = (courseId: Id, isCareerPath: boolean) => {
    const path = isCareerPath
      ? `/career-paths/${courseId}`
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
        <BasicNavbar
          leftButton={{
            icon: "arrowLeft",
            onClick: navigateWithTransition("/courses", {
              direction: "back",
            }),
          }}
        />
      </Box>
      <ContentContainer width="small" justifyContent="flex-start" spacing={10}>
        <Stack spacing={3} data-test="recommended-courses-and-career-paths-section">
          <Header variant="section" text={t("courses.recommended")} />
          <Stack direction="column" spacing={3}>
            {displayRecommended.map((course) => (
              <CourseOrCareerPathCard
                key={course.id}
                course={course}
                dataTestCourse="recommended-course-card"
                dataTestCareerPath="recommended-career-path-card"
                onSelect={handleCourseSelect}
              />
            ))}
          </Stack>
        </Stack>
        <Box sx={{ pt: 2 }}>
          <LargeButton
            data-test="retake-recommendation-quiz-button"
            onClick={() => navigateWithTransition("/courses/recommended/quiz")()}
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
