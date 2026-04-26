import type { Id } from "domain/models/types/core";
import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import { FetchHook } from "infrastructure/api/API";
import type {
  CourseStudyModeNullableOptional,
  ProductBaseModel,
} from "infrastructure/api/generated/models";
import { getUsers } from "infrastructure/api/generated/users/users";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";
import { invalidateCurrentUser } from "infrastructure/services/users/currentUserState";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

export interface UserProductsParams {}

export type UserProduct = ProductBaseModel;

const useUserProductsQuery = (
  params: UserProductsParams = {},
): Modify<
  FetchHook<Array<UserProduct>>,
  { userProducts: Array<UserProduct> }
> => {
  const query = parseQueryParams(params);
  const key = query ? `users/me/products?${query}` : "users/me/products";
  const { data, ...rest } = useAuthenticatedAPI<Array<UserProduct>>(
    key,
    async () => UserProductsService.getUserProducts(),
  );
  return { userProducts: data, ...rest };
};

export const UserProductsService = {
  async getUserProducts(): Promise<Array<UserProduct>> {
    try {
      const response = await usersClient.getApiUsersMeProducts();
      return (response.data as UserProduct[]) ?? [];
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async updateStudyMode(
    productId: Id,
    studyMode: CourseStudyModeNullableOptional | null,
  ): Promise<void> {
    try {
      await usersClient.patchApiUsersMeProductsProductId(productId, {
        studyMode,
      });
      await invalidateCurrentUser();
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async enrollInProduct(productId: Id): Promise<void> {
    try {
      await usersClient.putApiUsersMeProductsProductId(productId);
      await invalidateCurrentUser();
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async removeProduct(productId: Id): Promise<void> {
    try {
      await usersClient.deleteApiUsersMeProductsProductId(productId);
      await invalidateCurrentUser();
    } catch (error) {
      return toErrorCode(error);
    }
  },

  useUserProducts(
    params: UserProductsParams = {},
  ): Modify<
    FetchHook<Array<UserProduct>>,
    { userProducts: Array<UserProduct> }
  > {
    return useUserProductsQuery(params);
  },
};
