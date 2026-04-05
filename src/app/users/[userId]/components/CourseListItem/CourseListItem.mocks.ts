import { ICourseListItem } from "./CourseListItem";

const base: ICourseListItem = {
  courseId: 201,
  title: "JavaScript",
  progress: 40,
  variant: "course",
  logoVariant: "JavaScript",
};

const learningPath: ICourseListItem = {
  courseId: 202,
  title: "HTML Developer",
  progress: 40,
  variant: "learning-path",
  logoVariant: "HTML",
};

export const mockCourseListItemProps = {
  base,
  learningPath,
};

