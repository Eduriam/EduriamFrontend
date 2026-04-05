import type { Id } from "domain/models/types/core";

export interface StudyPlanUpcomingLesson {
  id: Id;
  title: string;
  thumbnailUrl: string;
}

export interface StudyPlanUpcomingCourse {
  id: Id;
  title: string;
  thumbnailUrl: string;
}

export interface StudyPlanOverview {
  upcomingLearnLesson: StudyPlanUpcomingLesson | null;
  upcomingReviewCourse: StudyPlanUpcomingCourse | null;
}

