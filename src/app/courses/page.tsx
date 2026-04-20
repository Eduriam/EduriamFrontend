"use client";

import type { Id } from "domain/models/types/core";

import {
  BasicNavbar,
  ContentContainer,
  Header,
  IconButton,
  PageRoot,
  Tabs,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { useScrollSpy } from "util/hooks/useScrollSpy";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import CourseCard from "components/courses/CourseCard/CourseCard";
import CourseLogo, {
  getVariantFromLogoId,
} from "components/courses/CourseLogo/CourseLogo";
import LearningPathCard from "components/courses/LearningPathCard/LearningPathCard";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import RecommendedCoursesAPI from "infrastructure/api/users/me/recommended-courses/RecommendedCoursesAPI";
import {
  isLearningPathProduct,
  StudyProduct,
  StudyProductService,
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

function getCourseLogoVariant(course: StudyProduct): "HTML" | "JavaScript" {
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
  course: StudyProduct;
  dataTestCourse?: string;
  dataTestLearningPath?: string;
  onSelect: (courseId: Id, isLearningPath: boolean) => void;
  premiumLabel: string;
}) {
  const icon = (
    <CourseLogo
      variant={
        getVariantFromLogoId(course.logoId ?? undefined) ??
        getCourseLogoVariant(course)
      }
    />
  );
  const isLearningPath = isLearningPathProduct(course);
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
          premium={course.premium}
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
        premium={course.premium}
        premiumLabel={premiumLabel}
        progress={progress}
        onClick={handleClick}
      />
    </Box>
  );
}

export interface ICoursesPage {}

const RECOMMENDED_TAB_VALUE = "recommended";

const CoursesPage: React.FC<ICoursesPage> = () => {
  const { t } = useTranslation("common");
  const { t: tForm } = useTranslation("form");
  const navigateWithTransition = useTransitionNavigationHandler();

  const { recommendedProducts } = RecommendedCoursesAPI.useRecommendedCourses();
  const { products } = StudyProductService.useProducts();

  const displayRecommended = (recommendedProducts ?? []).slice(0, 2);
  const displayAllCourses = products ?? [];
  const allCourseGroups = groupCoursesByCategory(displayAllCourses);

  const firstCategory = allCourseGroups[0]?.category ?? DEFAULT_CATEGORY;
  const categoryIds = allCourseGroups.map((g) => g.category);
  const [selectedTab, setSelectedTab] = useState<string | number>(
    RECOMMENDED_TAB_VALUE,
  );
  const effectiveTab =
    selectedTab === RECOMMENDED_TAB_VALUE
      ? RECOMMENDED_TAB_VALUE
      : categoryIds.length > 0 && categoryIds.includes(selectedTab as string)
        ? selectedTab
        : firstCategory;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollSpySectionIds = useMemo(
    () => [
      "recommended-courses-section",
      ...allCourseGroups.map((g) => `category-${g.category}`),
    ],
    [allCourseGroups],
  );

  useScrollSpy({
    sectionIds: scrollSpySectionIds,
    getTabValueFromSectionId: (id) =>
      id === "recommended-courses-section"
        ? RECOMMENDED_TAB_VALUE
        : id.replace(/^category-/, ""),
    onActiveSectionChange: setSelectedTab,
  });

  const handleTabChange = (value: string | number) => {
    setSelectedTab(value);
    const targetId =
      value === RECOMMENDED_TAB_VALUE
        ? "recommended-courses-section"
        : `category-${value}`;
    const el = document.getElementById(targetId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const tabs = [
    { label: t("courses.recommended"), value: RECOMMENDED_TAB_VALUE },
    ...allCourseGroups.map(({ category }) => ({
      label: tForm(`onboarding.courseCategories.${category}`) || category,
      value: category,
    })),
  ];
  const premiumLabel = t("courses.premiumLabel") || "Premium";

  const handleCourseSelect = (courseId: Id, isLearningPath: boolean) => {
    const path = isLearningPath
      ? `/learning-paths/${courseId}`
      : `/courses/${courseId}`;
    navigateWithTransition(path)();
  };

  return (
    <PageRoot data-test="courses-page">
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
                onClick: navigateWithTransition("/", {
                  direction: "back",
                }),
              }}
            />
          }
          mainNavigation="desktopOnly"
        />

        {tabs.length > 0 && (
          <Stack direction="column" width="100%" alignItems="center">
            <Box maxWidth="1000px" width="100%">
              <Tabs
                tabs={tabs}
                value={effectiveTab}
                onChange={handleTabChange}
              />
            </Box>
          </Stack>
        )}
      </Box>
      <ContentContainer width="small" justifyContent="flex-start" spacing={10}>
        <Stack data-test="courses-section" sx={{ width: "100%" }} spacing={10}>
          <Stack
            spacing={3}
            data-test="recommended-courses-section"
            id="recommended-courses-section"
            sx={{ scrollMarginTop: 120 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Header variant="section" text={t("courses.recommended")} />
              <IconButton
                data-test="all-recommendations-button"
                onClick={navigateWithTransition("/courses/recommended")}
                variant="text"
                icon="arrowRight"
                color="textPrimary"
              ></IconButton>
            </Box>
            <Stack direction="column" spacing={3}>
              {displayRecommended.map((course) => (
                <CourseOrLearningPathCard
                  key={course.id}
                  course={course}
                  dataTestCourse="course-card"
                  dataTestLearningPath="learning-path-card"
                  onSelect={handleCourseSelect}
                  premiumLabel={premiumLabel}
                />
              ))}
            </Stack>
          </Stack>

          <Stack spacing={10} data-test="all-courses-section">
            {allCourseGroups.map(({ category, courses: categoryCourses }) => (
              <Stack
                key={category}
                id={`category-${category}`}
                direction="column"
                spacing={3}
                sx={{ scrollMarginTop: 120 }}
              >
                <Header
                  variant="section"
                  text={
                    tForm(`onboarding.courseCategories.${category}`) || category
                  }
                />
                <Stack direction="column" spacing={3}>
                  {categoryCourses.map((course) => (
                    <CourseOrLearningPathCard
                      key={course.id}
                      course={course}
                      dataTestCourse="course-card"
                      dataTestLearningPath="learning-path-card"
                      onSelect={handleCourseSelect}
                      premiumLabel={premiumLabel}
                    />
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default CoursesPage;

