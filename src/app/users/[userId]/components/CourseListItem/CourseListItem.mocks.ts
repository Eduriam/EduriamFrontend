import { ICourseListItem } from "./CourseListItem";
import { ProductType } from "infrastructure/api/generated/models/productType";

const base: ICourseListItem = {
  courseId: 201,
  title: "JavaScript",
  progress: 40,
  variant: ProductType.Course,
  logoVariant: "javascript",
};

const learningPath: ICourseListItem = {
  courseId: 202,
  title: "HTML Developer",
  progress: 40,
  variant: ProductType.StudyPath,
  logoVariant: "html",
};

export const mockCourseListItemProps = {
  base,
  learningPath,
};
