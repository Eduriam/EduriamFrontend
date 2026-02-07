import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import API, { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { UserCourse } from "./UserCourses";

export interface CourseParams {}

const UserCoursesAPI = {
  URI: "user/courses",

  useUserCourses(
    params: CourseParams = {},
  ): Modify<FetchHook<Array<UserCourse>>, { courses: Array<UserCourse> }> {
    const { data, ...rest } = useAPI<Array<UserCourse>>(
      `${this.URI}?${parseQueryParams(params)}`,
    );
    return { courses: data, ...rest };
  },

  async enrollInCourse(courseId: Id): Promise<void> {
    return API.put(`${this.URI}/${courseId}`, {});
  },

  async selectCourse(courseId: Id): Promise<void> {
    return API.put(`${this.URI}/${courseId}/select-course`, {});
  },
};

export default UserCoursesAPI;
