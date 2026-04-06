"use client";

import type { Id } from "domain/models/types/core";

import { ContentContainer, Header, LargeButton } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import CourseCard from "components/courses/CourseCard/CourseCard";
import CourseLogo, {
  getVariantFromLogoId,
} from "components/courses/CourseLogo/CourseLogo";
import LearningPathCard from "components/courses/LearningPathCard/LearningPathCard";

import { CourseDTO } from "infrastructure/services/courses/CoursesService";

export interface IRecommendedCoursesStepProps {
  courses: CourseDTO[];
  htmlCourseId: Id | undefined;
  onCourseSelect: (courseId: Id) => void;
  onExploreAll: () => void;
}

const RecommendedCoursesStep: React.FC<IRecommendedCoursesStepProps> = ({
  courses,
  htmlCourseId,
  onCourseSelect,
  onExploreAll,
}) => {
  const { t: tForm } = useTranslation("form");
  const { t: tCommon } = useTranslation("common");
  const premiumLabel = tCommon("premium.premium");

  return (
    <ContentContainer width="small" justifyContent="space-between">
      <Stack spacing={6} data-test="recommended-courses-section">
        <Header
          variant="section"
          text={tForm("onboarding.recommendedForYou")}
        />
        <Stack direction="column" spacing={3}>
          {courses.map((course, index) => {
            const icon = (
              <CourseLogo
                variant={
                  getVariantFromLogoId(course.logoId) ??
                  (course.name?.toLowerCase().includes("javascript")
                    ? "JavaScript"
                    : "HTML")
                }
              />
            );
            const isLearningPath = course.type === "learning-path";
            return (
              <Box
                key={course.id}
                data-test={
                  index === 0 ||
                  course.id === htmlCourseId ||
                  course.name?.toLowerCase().includes("html")
                    ? "html-course-card"
                    : undefined
                }
              >
                {isLearningPath ? (
                  <LearningPathCard
                    title={course.name}
                    icon={icon}
                    premium={Boolean(course.premium)}
                    premiumLabel={premiumLabel}
                    onClick={() => onCourseSelect(course.id)}
                  />
                ) : (
                  <CourseCard
                    title={course.name}
                    icon={icon}
                    premium={Boolean(course.premium)}
                    premiumLabel={premiumLabel}
                    onClick={() => onCourseSelect(course.id)}
                  />
                )}
              </Box>
            );
          })}
        </Stack>
        <LargeButton
          data-test="explore-all-courses-button"
          onClick={onExploreAll}
          fullWidth
          variant="text"
        >
          {tForm("onboarding.exploreAllCourses")}
        </LargeButton>
      </Stack>
    </ContentContainer>
  );
};

export default RecommendedCoursesStep;

