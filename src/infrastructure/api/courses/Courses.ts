import { Language } from "domain/models/types/languages";

export interface CourseChapterSummary {
  id: Id;
  name: string;
  userProgress?: number;
}

export interface LearningPathCourseSummary {
  id: Id;
  name: string;
  logoId?: string;
  userProgress?: number;
}

export interface CoursePrerequisite {
  courseId: Id;
  courseName: string;
  completed?: boolean;
}

export type CourseDTO = Course | LearningPath;

export interface Course extends CourseBase {
  type: "course";
  chapters?: Array<CourseChapterSummary>;
}

export interface LearningPath extends CourseBase {
  type: "learning-path";
  courses?: Array<LearningPathCourseSummary>;
}

interface CourseBase {
  id: Id;
  name: string;
  language: Language;
  category?: string;
  logoId?: string;
  type?: "learning-path" | "course";
  userProgress?: number;
  /** Whether the current user is enrolled in this course. */
  enrolled?: boolean;
  /**
   * ID of the certificate for this course for the current user.
   * If the user has not completed the course or does not have access
   * to the certificate yet, this will be null or undefined.
   */
  userCertificate?: Id | null;
  /** Short marketing description for the course hero. */
  shortDescription?: string;
  /** Detailed course description used in the details drawer. */
  description?: string;
  /** List of course prerequisites shown in the details drawer. */
  prerequisites?: Array<CoursePrerequisite>;
  /** Next lesson ID to continue learning in this course. */
  upcomingLessonId?: Id;
}
