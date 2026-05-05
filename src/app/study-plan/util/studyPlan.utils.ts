import type { CourseLogoVariant } from "components/courses/CourseLogo/CourseLogo";

import { CourseStudyMode } from "infrastructure/api/generated/models";
import { UserProduct } from "infrastructure/services/courses/UserProductsService";

import { IStudyPlanCourseCard } from "../components/StudyPlanCourseCard/StudyPlanCourseCard";
import {
  StudyPlanCourse,
  StudyPlanLaneId,
  StudyPlanState,
} from "../types/studyPlan.types";

function isCourseLogoVariant(value: string): value is CourseLogoVariant {
  return value === "html" || value === "javascript" || value === "css";
}

function toLogoVariant(
  course: UserProduct,
): IStudyPlanCourseCard["logoVariant"] {
  if (course.logoId && isCourseLogoVariant(course.logoId)) {
    return course.logoId;
  }

  return "javascript";
}

export function mapCourseToStudyPlanCourse(
  course: UserProduct,
): StudyPlanCourse {
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
      courseId === 1001 ? "start-test-course-learning-button" : undefined,
    "data-test-course-click-area":
      courseId === 1001
        ? "test-course-learn-card-course-click-area"
        : courseId === 1002
          ? "test-course-paused-card-course-click-area"
          : undefined,
  };
}

export function mapStudyModeToLane(
  studyMode: UserProduct["studyMode"],
): StudyPlanLaneId {
  if (studyMode === CourseStudyMode.Review) {
    return "review";
  }
  if (studyMode === CourseStudyMode.Paused) {
    return "paused";
  }
  return "learn";
}

export function mapLaneToStudyMode(lane: StudyPlanLaneId): CourseStudyMode {
  if (lane === "review") {
    return CourseStudyMode.Review;
  }
  if (lane === "paused") {
    return CourseStudyMode.Paused;
  }
  return CourseStudyMode.Learn;
}

export function createInitialStateFromCourses(
  courses: UserProduct[] | undefined,
): StudyPlanState | null {
  if (!courses) {
    return null;
  }

  const learnCourses: StudyPlanCourse[] = [];
  const reviewCourses: StudyPlanCourse[] = [];
  const pausedCourses: StudyPlanCourse[] = [];

  for (const course of courses) {
    const mapped = mapCourseToStudyPlanCourse(course);

    if (mapStudyModeToLane(course.studyMode) === "learn") {
      learnCourses.push(mapped);
    } else if (mapStudyModeToLane(course.studyMode) === "review") {
      reviewCourses.push(mapped);
    } else {
      pausedCourses.push(mapped);
    }
  }

  return {
    learn: learnCourses,
    review: reviewCourses,
    paused: pausedCourses,
  };
}

export function findCourseLocation(
  lanes: StudyPlanState,
  courseId: number,
): { laneId: StudyPlanLaneId; index: number; course: StudyPlanCourse } | null {
  for (const laneId of ["learn", "review", "paused"] as const) {
    const index = lanes[laneId].findIndex((course) => course.id === courseId);
    if (index !== -1) {
      return {
        laneId,
        index,
        course: lanes[laneId][index],
      };
    }
  }

  return null;
}
