import { Language } from "domain/models/types/languages";
import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import API, { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { Course } from "./Courses";

export interface CourseParams {
  language1?: Language;
}

const CoursesAPI = {
  URI: "courses",

  async getCourse(id: Id): Promise<Course> {
    return API.get(`${this.URI}/${id}`);
  },

  useCourse(id: Id): Modify<FetchHook<Course>, { course: Course }> {
    const { data, ...rest } = useAPI<Course>(`${this.URI}/${id}`);
    return { course: data, ...rest };
  },

  useCourses(
    params: CourseParams = {},
  ): Modify<FetchHook<Array<Course>>, { courses: Array<Course> }> {
    const { data, ...rest } = useAPI<Array<Course>>(
      `${this.URI}?${parseQueryParams(params)}`,
    );
    return { courses: data, ...rest };
  },
};

export default CoursesAPI;
