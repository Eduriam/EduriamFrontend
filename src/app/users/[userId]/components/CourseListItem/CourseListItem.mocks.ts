import { ICourseListItem } from "./CourseListItem";

const base: ICourseListItem = {
  courseId: "test-course-javascript",
  title: "JavaScript",
  progress: 40,
  variant: "course",
  logoVariant: "JavaScript",
};

const learningPath: ICourseListItem = {
  courseId: "test-learning-path-web",
  title: "HTML Developer",
  progress: 40,
  variant: "learning-path",
  logoVariant: "HTML",
};

export const mockCourseListItemProps = {
  base,
  learningPath,
};
