"use client";

import { ContentContainer, Header } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import CourseCard from "components/courses/CourseCard/CourseCard";
import CourseLogo from "components/courses/CourseLogo/CourseLogo";

import type { Course } from "infrastructure/api/courses/Courses";

export interface IAllCoursesStepProps {
  courses: Course[];
  htmlCourseId: Id | undefined;
  onCourseSelect: (courseId: Id) => void;
}

const AllCoursesStep: React.FC<IAllCoursesStepProps> = ({
  courses,
  htmlCourseId,
  onCourseSelect,
}) => {
  const { t: tForm } = useTranslation("form");

  return (
    <ContentContainer width="small" justifyContent="space-between">
      <Stack spacing={6} data-test="all-courses-section">
        <Header
          variant="section"
          text={tForm("onboarding.exploreAllCourses")}
        />
        <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
          {courses.map((course, index) => (
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
              <CourseCard
                title={course.name}
                icon={
                  <CourseLogo
                    variant={
                      course.name?.toLowerCase().includes("javascript")
                        ? "JavaScript"
                        : "HTML"
                    }
                  />
                }
                onClick={() => onCourseSelect(course.id)}
              />
            </Box>
          ))}
        </Stack>
      </Stack>
    </ContentContainer>
  );
};

export default AllCoursesStep;
