import { Language } from "domain/models/types/languages";

import { FeaturedTopic } from "infrastructure/api/user/topics/Topics";

export interface CourseChapterSummary {
  id: Id;
  name: string;
  userProgress?: number;
}

export interface CoursePrerequisite {
  courseId: Id;
  courseName: string;
  completed?: boolean;
}

export interface Course {
  id: Id;
  name: string;
  language: Language;
  category?: string;
  logoId?: string;
  type?: "career-path" | "course";
  featuredTopics?: Array<FeaturedTopic>;
  userProgress?: number;
  /** Whether the current user is enrolled in this course. */
  enrolled?: boolean;
  /** Short marketing description for the course hero. */
  shortDescription?: string;
  /** Detailed course description used in the details drawer. */
  description?: string;
  /** List of course prerequisites shown in the details drawer. */
  prerequisites?: Array<CoursePrerequisite>;
  chapters?: Array<CourseChapterSummary>;
}
