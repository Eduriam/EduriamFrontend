import { Course } from "infrastructure/api/courses/Courses";

export type StudyMode = "learn" | "review" | "paused";

export type UserCourse = Pick<
  Course,
  "id" | "language" | "name" | "category" | "logoId" | "type" | "userProgress" | "enrolled"
> & {
  studyMode: StudyMode;
};
