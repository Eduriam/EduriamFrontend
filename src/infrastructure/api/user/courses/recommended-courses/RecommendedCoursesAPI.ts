import { Course } from "infrastructure/api/courses/Courses";
import { Modify } from "domain/models/utils/modify";

import { FetchHook } from "infrastructure/api/API";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";

const RecommendedCoursesAPI = {
  URI: "user/recommended-courses",

  useRecommendedCourses(): Modify<
    FetchHook<Array<Course>>,
    { recommendedCourses: Array<Course> }
  > {
    const { data, ...rest } = useAuthenticatedAPI<Array<Course>>(this.URI);
    return { recommendedCourses: data, ...rest };
  },
};

export default RecommendedCoursesAPI;


