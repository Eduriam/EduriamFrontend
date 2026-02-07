"use client";

import { ContentContainer, Header, Tabs } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import CareerPathCard from "components/courses/CareerPathCard/CareerPathCard";
import CourseCard from "components/courses/CourseCard/CourseCard";
import CourseLogo, {
  getVariantFromLogoId,
} from "components/courses/CourseLogo/CourseLogo";

import type { Course } from "infrastructure/api/courses/Courses";

const DEFAULT_CATEGORY = "other";

function groupCoursesByCategory(
  courses: Course[],
): Array<{ category: string; courses: Course[] }> {
  const map = new Map<string, Course[]>();
  for (const course of courses) {
    const category = course.category ?? DEFAULT_CATEGORY;
    const list = map.get(category);
    if (list) {
      list.push(course);
    } else {
      map.set(category, [course]);
    }
  }
  return Array.from(map.entries()).map(([category, list]) => ({
    category,
    courses: list,
  }));
}

function getCourseLogoVariant(course: Course): "HTML" | "JavaScript" {
  const name = course.name?.toLowerCase() ?? "";
  return name.includes("javascript") ? "JavaScript" : "HTML";
}

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

  const groups = groupCoursesByCategory(courses);
  const firstCategory = groups[0]?.category ?? DEFAULT_CATEGORY;

  const [selectedTab, setSelectedTab] = useState<string | number>(
    firstCategory,
  );

  const categoryIds = groups.map((g) => g.category);
  const effectiveTab =
    categoryIds.length > 0 && categoryIds.includes(selectedTab as string)
      ? selectedTab
      : (groups[0]?.category ?? DEFAULT_CATEGORY);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTabChange = (value: string | number) => {
    setSelectedTab(value);
    const el = document.getElementById(`category-${value}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const tabs = groups.map(({ category }) => ({
    label: tForm(`onboarding.courseCategories.${category}`) || category,
    value: category,
  }));

  return (
    <>
      {groups.length > 0 && (
        <Stack
          direction="column"
          width="100%"
          alignItems="center"
          sx={{
            position: "sticky",
            top: 64,
            zIndex: 10,
            backgroundColor: "background.default",
          }}
        >
          <Box maxWidth="1000px" width="100%">
            <Tabs tabs={tabs} value={effectiveTab} onChange={handleTabChange} />
          </Box>
        </Stack>
      )}
      <ContentContainer width="small" justifyContent="space-between">
        <Stack spacing={6} data-test="all-courses-section">
          <Stack spacing={10}>
            {groups.map(({ category, courses: categoryCourses }) => (
              <Stack
                key={category}
                id={`category-${category}`}
                direction="column"
                spacing={2}
                sx={{ scrollMarginTop: 120 }}
              >
                <Header
                  variant="subsection"
                  text={
                    tForm(`onboarding.courseCategories.${category}`) || category
                  }
                />

                {categoryCourses.map((course) => {
                  const icon = (
                    <CourseLogo
                      variant={
                        getVariantFromLogoId(course.logoId) ??
                        getCourseLogoVariant(course)
                      }
                    />
                  );
                  const isCareerPath = course.type === "career-path";
                  return (
                    <Box
                      key={course.id}
                      data-test={
                        course.id === htmlCourseId ||
                        course.name?.toLowerCase().includes("html")
                          ? "html-course-card"
                          : undefined
                      }
                    >
                      {isCareerPath ? (
                        <CareerPathCard
                          title={course.name}
                          icon={icon}
                          onClick={() => onCourseSelect(course.id)}
                        />
                      ) : (
                        <CourseCard
                          title={course.name}
                          icon={icon}
                          onClick={() => onCourseSelect(course.id)}
                        />
                      )}
                    </Box>
                  );
                })}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </ContentContainer>
    </>
  );
};

export default AllCoursesStep;
