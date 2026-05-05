import { Id } from "domain/models/types/core";

import { IStudyPlanCourseCard } from "../components/StudyPlanCourseCard/StudyPlanCourseCard";

export type StudyPlanLaneId = "learn" | "review" | "paused";

export interface StudyPlanCourse
  extends Pick<
    IStudyPlanCourseCard,
    | "title"
    | "logoVariant"
    | "data-test-course-click-area"
    | "data-test-learn-button"
  > {
  id: Id;
  /**
   * Optional data-test attribute for E2E tests.
   */
  dataTest?: string;
}

export type StudyPlanState = Record<StudyPlanLaneId, StudyPlanCourse[]>;
