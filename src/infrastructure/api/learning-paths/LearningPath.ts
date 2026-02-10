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
  /**
   * ID of the certificate for this learning path for the current user.
   * If the user has not completed the learning path or does not have access
   * to the certificate yet, this will be null or undefined.
   */
  userCertificate?: Id | null;
  shortDescription?: string;
  description?: string;
  prerequisites?: Array<CoursePrerequisite>;
  courses: Array<LearningPathCourseSummary>;
}
