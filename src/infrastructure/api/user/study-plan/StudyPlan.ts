export interface StudyPlanLessonPreview {
  title: string;
  thumbnailUrl: string;
}

export interface StudyPlanOverview {
  upcomingLearnLesson: StudyPlanLessonPreview | null;
  upcomingReviewCourse: StudyPlanLessonPreview | null;
}

