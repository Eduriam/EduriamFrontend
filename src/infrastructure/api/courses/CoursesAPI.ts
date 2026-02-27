import { Language } from "domain/models/types/languages";
import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import API, { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { CourseDTO } from "./Courses";

export interface CourseParams {
  language?: Language;
}

const CoursesAPI = {
  URI: "courses",

  async getCourse(id: Id): Promise<CourseDTO> {
    return API.get(`${this.URI}/${id}`);
  },

  useCourse(id: Id): Modify<FetchHook<CourseDTO>, { course: CourseDTO }> {
    const { data, ...rest } = useAPI<CourseDTO>(`${this.URI}/${id}`);
    return { course: data, ...rest };
  },

  useCourses(
    params: CourseParams = {},
  ): Modify<FetchHook<Array<CourseDTO>>, { courses: Array<CourseDTO> }> {
    const { data, ...rest } = useAPI<Array<CourseDTO>>(
      `${this.URI}?${parseQueryParams(params)}`,
    );
    return { courses: data, ...rest };
  },
};

export default CoursesAPI;
