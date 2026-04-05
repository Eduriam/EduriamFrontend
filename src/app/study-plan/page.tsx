"use client";

import {
  BasicNavbar,
  ContentContainer,
  Header,
  PageRoot,
} from "@eduriam/ui-core";
import { Id } from "domain/models/types/core";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { getVariantFromLogoId } from "components/courses/CourseLogo/CourseLogo";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import type { UserCourse } from "infrastructure/api/users/me/courses/UserCourses";
import UserCoursesAPI from "infrastructure/api/users/me/courses/UserCoursesAPI";

import StudyPlanCourseCard, {
  type IStudyPlanCourseCard,
} from "./components/StudyPlanCourseCard/StudyPlanCourseCard";

type StudyPlanLaneId = "learn" | "review" | "paused";

interface StudyPlanCourse
  extends Pick<
    IStudyPlanCourseCard,
    "title" | "logoVariant" | "data-test-learn-button"
  > {
  id: Id;
  /**
   * Optional data-test attribute for E2E tests.
   */
  dataTest?: string;
}

type StudyPlanState = Record<StudyPlanLaneId, StudyPlanCourse[]>;

function toLogoVariant(
  course: UserCourse,
): IStudyPlanCourseCard["logoVariant"] {
  const byLogoId =
    (course.logoId && getVariantFromLogoId(course.logoId)) ?? undefined;
  if (byLogoId) {
    return byLogoId;
  }
  const name = course.name.toLowerCase();
  return name.includes("javascript") ? "JavaScript" : "HTML";
}

function mapCourseToStudyPlanCourse(course: UserCourse): StudyPlanCourse {
  const courseId = course.id;

  return {
    id: course.id,
    title: course.name,
    logoVariant: toLogoVariant(course),
    dataTest:
      courseId === 1001
        ? "test-course-learn-card"
        : courseId === 1002
          ? "test-course-paused-card"
          : undefined,
    "data-test-learn-button":
      courseId === 1001
        ? "start-test-course-learning-button"
        : undefined,
  };
}

function createInitialStateFromCourses(
  courses: UserCourse[] | undefined,
): StudyPlanState | null {
  if (!courses) {
    return null;
  }

  const learnCourses: StudyPlanCourse[] = [];
  const reviewCourses: StudyPlanCourse[] = [];
  const pausedCourses: StudyPlanCourse[] = [];

  for (const course of courses) {
    const mapped = mapCourseToStudyPlanCourse(course);

    if (course.studyMode === "learn") {
      learnCourses.push(mapped);
    } else if (course.studyMode === "review") {
      reviewCourses.push(mapped);
    } else if (course.studyMode === "paused") {
      pausedCourses.push(mapped);
    }
  }

  return {
    learn: learnCourses,
    review: reviewCourses,
    paused: pausedCourses,
  };
}

const StudyPlanPage: React.FC = () => {
  const navigateWithTransition = useTransitionNavigationHandler();
  const { courses } = UserCoursesAPI.useUserCourses();

  const [lanes, setLanes] = React.useState<StudyPlanState | null>(() =>
    createInitialStateFromCourses(courses),
  );

  React.useEffect(() => {
    if (!lanes) {
      setLanes(createInitialStateFromCourses(courses));
    }
  }, [courses, lanes]);

  const [dragOverLane, setDragOverLane] =
    React.useState<StudyPlanLaneId | null>(null);

  const [dragging, setDragging] = React.useState<{
    courseId: Id;
    fromLane: StudyPlanLaneId;
  } | null>(null);

  const handleDragStart = (laneId: StudyPlanLaneId, courseId: Id) => {
    setDragging({ courseId, fromLane: laneId });
  };

  const handleDragEnd = () => {
    setDragging(null);
    setDragOverLane(null);
  };

  const handleDropOnLane = async (targetLane: StudyPlanLaneId) => {
    if (!dragging || !lanes) {
      return;
    }

    const { courseId, fromLane } = dragging;

    if (fromLane === targetLane) {
      setDragging(null);
      return;
    }

    setLanes((prev) => {
      if (!prev) {
        return prev;
      }

      const sourceCourses = prev[fromLane];
      const targetCourses = prev[targetLane];

      const courseIndex = sourceCourses.findIndex((c) => c.id === courseId);
      if (courseIndex === -1) {
        return prev;
      }

      const course = sourceCourses[courseIndex];

      return {
        ...prev,
        [fromLane]: sourceCourses.filter((c) => c.id !== courseId),
        [targetLane]: [course, ...targetCourses],
      };
    });

    // Persist study mode change to backend
    const newStudyMode: UserCourse["studyMode"] =
      targetLane === "learn" ? "learn" : targetLane;
    try {
      await UserCoursesAPI.updateStudyMode(courseId, newStudyMode);
    } catch {
      // Silently ignore errors for now; UI has already updated optimistically.
    }

    setDragging(null);
    setDragOverLane(null);
  };

  const renderLane = (
    laneId: StudyPlanLaneId,
    title: string,
    dataTest: string,
  ) => {
    const courses = lanes?.[laneId] ?? [];
    const isLearnLane = laneId === "learn";

    return (
      <Box
        key={laneId}
        data-test={dataTest}
        onDragOver={(event) => {
          event.preventDefault();
          if (dragging) {
            setDragOverLane(laneId);
          }
        }}
        onDrop={(event) => {
          event.preventDefault();
          handleDropOnLane(laneId);
        }}
        sx={{ width: "100%", minHeight: 140 }}
      >
        <Header variant="section" text={title} />
        <Stack direction="column" spacing={3} mt={3}>
          {dragging && dragOverLane === laneId && (
            <Box
              sx={{
                height: 96,
                borderRadius: 2,
                border: "2px dashed",
                borderColor: "divider",
                bgcolor: "background.paper",
                opacity: 0.8,
              }}
            />
          )}
          {courses.map((course) => (
            <Box
              key={course.id}
              draggable
              data-test={course.dataTest}
              onDragStart={() => handleDragStart(laneId, course.id)}
              onDragEnd={handleDragEnd}
            >
              <StudyPlanCourseCard
                title={course.title}
                logoVariant={course.logoVariant}
                onPlayClick={
                  isLearnLane
                    ? navigateWithTransition(`/study?courseId=${course.id}`)
                    : undefined
                }
                data-test-learn-button={course["data-test-learn-button"]}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    );
  };

  if (!lanes) {
    return (
      <PageRoot data-test="study-plan-page">
        <PageNavigation
          topNavigation={
            <BasicNavbar
              leftButton={{
                icon: "arrowLeft",
                onClick: navigateWithTransition("/", {
                  direction: "back",
                }),
              }}
              rightButton={{
                icon: "add",
                onClick: navigateWithTransition("/courses"),
              }}
              header="Study Plan"
            />
          }
          mainNavigation="desktopOnly"
        />
      </PageRoot>
    );
  }

  return (
    <PageRoot data-test="study-plan-page">
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
                icon: "chevronLeft",
                onClick: navigateWithTransition("/", {
                  direction: "back",
                }),
              }}
              rightButton={{
                icon: "add",
                onClick: navigateWithTransition("/courses"),
              }}
              header="Study Plan"
            />
          }
          mainNavigation="desktopOnly"
        />
      </Box>

      <ContentContainer width="small" justifyContent="flex-start" spacing={10}>
        <Box data-test="study-plan-section" sx={{ width: "100%" }}>
          <Stack width="100%" spacing={8}>
            {renderLane(
              "learn",
              "Learn and Review",
              "learn-courses-list-section",
            )}
            {renderLane("review", "Review Only", "review-courses-list-section")}
            {renderLane("paused", "Paused", "paused-courses-list-section")}
          </Stack>
        </Box>
      </ContentContainer>
    </PageRoot>
  );
};

export default StudyPlanPage;
