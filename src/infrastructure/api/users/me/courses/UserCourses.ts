import { StudyProduct } from "infrastructure/services/courses/StudyProductService";

export type StudyMode = "learn" | "review" | "paused";

export type UserCourse = Pick<
  StudyProduct,
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
