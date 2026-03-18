import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import API, { FetchHook } from "infrastructure/api/API";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";

import { UserCourse } from "./UserCourses";

export interface CourseParams {}

const UserCoursesAPI = {
  URI: "users/me/courses",

  useUserCourses(
    params: CourseParams = {},
  ): Modify<FetchHook<Array<UserCourse>>, { courses: Array<UserCourse> }> {
    const { data, ...rest } = useAuthenticatedAPI<Array<UserCourse>>(
      `${this.URI}?${parseQueryParams(params)}`,
    );
    return { courses: data, ...rest };
  },

  async updateStudyMode(
    courseId: Id,
    studyMode: UserCourse["studyMode"],
  ): Promise<void> {
    await API.patch(`${this.URI}/${courseId}`, { studyMode });
  },

  async enrollInCourse(courseId: Id): Promise<void> {
    return API.put(`${this.URI}/${courseId}`, {});
  },

  async removeCourse(courseId: Id): Promise<void> {
    await API.delete(`${this.URI}/${courseId}`);
  },
};

export default UserCoursesAPI;
