import { ICourseListItem } from "./CourseListItem";
import { ProductType } from "infrastructure/api/generated/models";

const base: ICourseListItem = {
  courseId: 201,
  title: "JavaScript",
  progress: 40,
  variant: ProductType.Course,
  logoVariant: "JavaScript",
};

const learningPath: ICourseListItem = {
  courseId: 202,
  title: "HTML Developer",
  progress: 40,
  variant: ProductType.StudyPath,
  logoVariant: "HTML",
};

export const mockCourseListItemProps = {
  base,
  learningPath,
};

