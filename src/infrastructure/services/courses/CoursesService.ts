import type { Id } from "domain/models/types/core";
import type { Language } from "domain/models/types/languages";
import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import { FetchHook } from "infrastructure/api/API";
import { getCourses } from "infrastructure/api/generated/courses/courses";
import type {
  CourseCatalogItemModelBase,
  CourseCatalogItemModelBasePagedResult,
} from "infrastructure/api/generated/models";
import useAPI from "infrastructure/api/hooks/useAPI";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const coursesClient = getCourses();

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
  premium?: boolean;
}

export interface CoursePrerequisite {
  courseId: Id;
  courseName: string;
  completed?: boolean;
}

interface CourseBase {
  id: Id;
  name: string;
  language?: Language;
  category?: string;
  logoId?: string;
  type?: "learning-path" | "course";
  userProgress?: number;
  enrolled?: boolean;
  premium?: boolean;
  userCertificate?: Id | null;
  shortDescription?: string;
  description?: string;
  prerequisites?: Array<CoursePrerequisite>;
  upcomingLessonId?: Id | null;
}

export interface Course extends CourseBase {
  type: "course";
  chapters?: Array<CourseChapterSummary>;
}

export interface LearningPath extends CourseBase {
  type: "learning-path";
  courses?: Array<LearningPathCourseSummary>;
}

export type CourseDTO = Course | LearningPath;

export interface CourseParams {}

type RawCourse = CourseCatalogItemModelBase &
  Partial<{
    language: Language;
    category: string;
    logoId: string;
    type: "learning-path" | "course";
    premium: boolean;
    shortDescription: string;
    prerequisites: Array<CoursePrerequisite>;
    chapters: Array<CourseChapterSummary>;
    courses: Array<LearningPathCourseSummary>;
  }>;

const normalizeNullable = <T>(value: T | null | undefined): T | undefined =>
  value ?? undefined;

const normalizeCourseType = (course: RawCourse): "learning-path" | "course" => {
  if (course.type === "learning-path" || course.type === "course") {
    return course.type;
  }

  return Array.isArray(course.courses) ? "learning-path" : "course";
};

const toCourseDTO = (courseModel: CourseCatalogItemModelBase): CourseDTO => {
  const course = courseModel as RawCourse;
  const type = normalizeCourseType(course);
  const base: CourseBase = {
    id: course.id,
    name: course.name,
    language: course.language,
    category: course.category,
    logoId: course.logoId,
    type,
    userProgress: normalizeNullable(course.userProgress),
    enrolled: normalizeNullable(course.enrolled),
    premium: course.premium,
    userCertificate: normalizeNullable(course.userCertificate),
    shortDescription: course.shortDescription,
    description: course.description ?? undefined,
    prerequisites: course.prerequisites,
    upcomingLessonId: normalizeNullable(course.upcomingLessonId),
  };

  if (type === "learning-path") {
    return {
      ...base,
      type,
      courses: course.courses,
    };
  }

  return {
    ...base,
    type,
    chapters: course.chapters,
  };
};

const toCourseList = (
  responseData: CourseCatalogItemModelBasePagedResult | CourseCatalogItemModelBase[],
): Array<CourseDTO> => {
  const items = Array.isArray(responseData) ? responseData : responseData.items;
  return (items ?? []).map(toCourseDTO);
};

function useCourseQuery(id: Id): Modify<FetchHook<CourseDTO>, { course: CourseDTO }> {
  const { data, ...rest } = useAPI<CourseDTO>(
    `courses/${id}`,
    async () => CoursesService.getCourse(id),
  );

  return { course: data, ...rest };
}

function useCoursesQuery(
  params: CourseParams = {},
): Modify<FetchHook<Array<CourseDTO>>, { courses: Array<CourseDTO> }> {
  const query = parseQueryParams(params);
  const key = query ? `courses?${query}` : "courses";
  const { data, ...rest } = useAPI<Array<CourseDTO>>(
    key,
    async () => CoursesService.getCourses(params),
  );

  return { courses: data, ...rest };
}

export const CoursesService = {
  URI: "courses",

  async getCourse(id: Id): Promise<CourseDTO> {
    try {
      const response = await coursesClient.getApiCoursesId(id);
      if (!response.data) {
        throw new Error("Course response is empty.");
      }

      return toCourseDTO(response.data);
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async getCourses(params: CourseParams = {}): Promise<Array<CourseDTO>> {
    try {
      const response = await coursesClient.getApiCourses(params);
      if (!response.data) {
        throw new Error("Courses response is empty.");
      }

      return toCourseList(
        response.data as CourseCatalogItemModelBasePagedResult | CourseCatalogItemModelBase[],
      );
    } catch (error) {
      return toErrorCode(error);
    }
  },

  useCourse(id: Id): Modify<FetchHook<CourseDTO>, { course: CourseDTO }> {
    return useCourseQuery(id);
  },

  useCourses(
    params: CourseParams = {},
  ): Modify<FetchHook<Array<CourseDTO>>, { courses: Array<CourseDTO> }> {
    return useCoursesQuery(params);
  },
};
