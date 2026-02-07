import { Course } from "infrastructure/api/courses/Courses";

import { StartingLevel } from "../account-setup/AccountSetup";

export type UserCourse = Pick<Course, "id" | "language" | "name">;

export interface EnrollInCourseDTO {
  startingLevel: StartingLevel;
  selectedTopicIds: Array<Id>;
}
