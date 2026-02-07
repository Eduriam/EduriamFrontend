import { Course } from "infrastructure/api/courses/Courses";
import { Modify } from "domain/models/utils/modify";

import { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

const RecommendedCoursesAPI = {
  URI: "user/recommended-courses",

  useRecommendedCourses(): Modify<
    FetchHook<Array<Course>>,
    { recommendedCourses: Array<Course> }
  > {
    const { data, ...rest } = useAPI<Array<Course>>(this.URI);
    return { recommendedCourses: data, ...rest };
  },
};

export default RecommendedCoursesAPI;
