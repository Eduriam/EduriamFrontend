import { Modify } from "domain/models/utils/modify";

import { FetchHook } from "infrastructure/api/API";
import type { ProductBaseModelPagedResult } from "infrastructure/api/generated/models";
import { getUsers } from "infrastructure/api/generated/users/users";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";
import type { StudyProduct } from "infrastructure/services/courses/StudyProductService";

const usersClient = getUsers();

function useRecommendedProductsQuery(): Modify<
  FetchHook<Array<StudyProduct>>,
  { recommendedProducts: Array<StudyProduct> }
> {
  const { data, ...rest } = useAuthenticatedAPI<Array<StudyProduct>>(
    "users/me/products/recommended",
    async () => {
      const response = await usersClient.getApiUsersMeProductsRecommended();
      const pagedResult = response.data as ProductBaseModelPagedResult | void;
      return (pagedResult?.items as StudyProduct[] | undefined) ?? [];
    },
  );

  return { recommendedProducts: data ?? [], ...rest };
}

export const RecommendedProductsService = {
  useRecommendedProducts(): Modify<
    FetchHook<Array<StudyProduct>>,
    { recommendedProducts: Array<StudyProduct> }
  > {
    return useRecommendedProductsQuery();
  },
};
