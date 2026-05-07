"use client";

import { ContentContainer, Header, Tabs } from "@eduriam/ui-core";
import type { Id } from "domain/models/types/core";
import { useTranslation } from "i18n/client";
import { useScrollSpy } from "util/hooks/useScrollSpy";

import { useEffect, useMemo, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import CourseCard from "components/courses/CourseCard/CourseCard";
import CourseLogo from "components/courses/CourseLogo/CourseLogo";
import LearningPathCard from "components/courses/LearningPathCard/LearningPathCard";

import {
  StudyProduct,
  isLearningPathProduct,
} from "infrastructure/services/courses/StudyProductService";

const DEFAULT_CATEGORY = "other";

function groupCoursesByCategory(
  courses: StudyProduct[],
): Array<{ category: string; courses: StudyProduct[] }> {
  const map = new Map<string, StudyProduct[]>();
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

export interface IAllCoursesStepProps {
  courses: StudyProduct[];
  htmlCourseId: Id | undefined;
  onCourseSelect: (courseId: Id) => void;
}

const AllCoursesStep: React.FC<IAllCoursesStepProps> = ({
  courses,
  htmlCourseId,
  onCourseSelect,
}) => {
  const { t: tForm } = useTranslation("form");
  const { t: tCommon } = useTranslation("common");
  const premiumLabel = tCommon("courses.premiumLabel");

  const groups = useMemo(() => groupCoursesByCategory(courses), [courses]);
  const firstCategory = groups[0]?.category ?? DEFAULT_CATEGORY;

  const [selectedTab, setSelectedTab] = useState<string | number>(
    firstCategory,
  );
  const manualTabActivationUntilRef = useRef(0);

  const categoryIds = groups.map((g) => g.category);
  const effectiveTab =
    categoryIds.length > 0 && categoryIds.includes(selectedTab as string)
      ? selectedTab
      : (groups[0]?.category ?? DEFAULT_CATEGORY);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollSpySectionIds = useMemo(
    () => groups.map((g) => `category-${g.category}`),
    [groups],
  );

  useScrollSpy({
    sectionIds: scrollSpySectionIds,
    getTabValueFromSectionId: (id) => id.replace(/^category-/, ""),
    onActiveSectionChange: (value) => {
      if (Date.now() < manualTabActivationUntilRef.current) {
        return;
      }
      setSelectedTab(value);
    },
  });

  const handleTabChange = (value: string | number) => {
    manualTabActivationUntilRef.current = Date.now() + 800;
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
        <>
          <Box
            sx={{
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              zIndex: 20,
              backgroundColor: "background.default",
            }}
          >
            <Stack direction="column" width="100%" alignItems="center">
              <Box maxWidth="1000px" width="100%">
                <Tabs
                  tabs={tabs}
                  value={effectiveTab}
                  onChange={handleTabChange}
                />
              </Box>
            </Stack>
          </Box>
          <Box sx={{ height: 48 }} />
        </>
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
                  const icon = <CourseLogo variant={course.logoId} />;
                  const isLearningPath = isLearningPathProduct(course);
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
            ))}
          </Stack>
        </Stack>
      </ContentContainer>
    </>
  );
};

export default AllCoursesStep;
