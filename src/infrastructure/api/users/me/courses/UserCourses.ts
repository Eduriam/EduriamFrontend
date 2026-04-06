import { Course } from "infrastructure/services/courses/CoursesService";

export type StudyMode = "learn" | "review" | "paused";

export type UserCourse = Pick<
  Course,
  | "id"
  | "language"
  | "name"
  | "category"
  | "logoId"
  | "type"
  | "userProgress"
  | "enrolled"
  | "premium"
> & {
  studyMode: StudyMode;
};
