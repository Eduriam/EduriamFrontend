import { Course } from "infrastructure/api/courses/Courses";

export type UserCourse = Pick<Course, "id" | "language" | "name">;
