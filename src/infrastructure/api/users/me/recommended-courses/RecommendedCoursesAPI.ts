import { Modify } from "domain/models/utils/modify";

import { FetchHook } from "infrastructure/api/API";
import { getUsers } from "infrastructure/api/generated/users/users";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";
import type { StudyProduct } from "infrastructure/services/courses/StudyProductService";

const usersClient = getUsers();

const RecommendedCoursesAPI = {
  URI: "users/me/products/recommended",

  useRecommendedCourses(): Modify<
    FetchHook<Array<StudyProduct>>,
    { recommendedProducts: Array<StudyProduct> }
  > {
    const { data, ...rest } = useAuthenticatedAPI<Array<StudyProduct>>(
      this.URI,
      async () => {
        const response = await usersClient.getApiUsersMeProductsRecommended();
        return (response.data?.items as StudyProduct[]) ?? [];
      },
    );

    return { recommendedProducts: data ?? [], ...rest };
  },
};

export default RecommendedCoursesAPI;
