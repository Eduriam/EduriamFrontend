import { Language } from "domain/models/types/languages";

import { CoursePrerequisite } from "../courses/Courses";

export interface LearningPathCourseSummary {
  id: Id;
  name: string;
  logoId?: string;
  userProgress?: number;
}

export interface LearningPath {
  id: Id;
  name: string;
  language: Language;
  category?: string;
  logoId?: string;
  type: "learning-path";
  userProgress?: number;
  enrolled?: boolean;
  shortDescription?: string;
  description?: string;
  prerequisites?: Array<CoursePrerequisite>;
  courses: Array<LearningPathCourseSummary>;
}
