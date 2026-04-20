import type { Id } from "domain/models/types/core";
import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import { FetchHook } from "infrastructure/api/API";
import { getProducts } from "infrastructure/api/generated/products/products";
import {
  ProductType,
  type CourseChapterSummaryModel,
  type ProductBaseModelPagedResult,
  type ProductCourseModel,
  type ProductLearningPathModel,
  type ProductMemberSummaryModel,
} from "infrastructure/api/generated/models";
import useAPI from "infrastructure/api/hooks/useAPI";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const productsClient = getProducts();

export type StudyProduct = ProductCourseModel | ProductLearningPathModel;
export type StudyProductChapterSummary = CourseChapterSummaryModel;
export type StudyPathProductSummary = ProductMemberSummaryModel;
export type CourseProduct = ProductCourseModel;
export type StudyPathProduct = ProductLearningPathModel;

export interface StudyProductParams {}

export function isCourseProduct(
  product: StudyProduct | null | undefined,
): product is CourseProduct {
  return product?.type === ProductType.Course;
}

export function isLearningPathProduct(
  product: StudyProduct | null | undefined,
): product is StudyPathProduct {
  return product?.type === ProductType.StudyPath;
}

function useStudyProductQuery(
  id: Id,
): Modify<FetchHook<StudyProduct>, { product: StudyProduct }> {
  const { data, ...rest } = useAPI<StudyProduct>(
    `products/${id}`,
    async () => StudyProductService.getProduct(id),
  );

  return { product: data, ...rest };
}

function useStudyProductsQuery(
  params: StudyProductParams = {},
): Modify<FetchHook<Array<StudyProduct>>, { products: Array<StudyProduct> }> {
  const query = parseQueryParams(params);
  const key = query ? `products?${query}` : "products";
  const { data, ...rest } = useAPI<Array<StudyProduct>>(
    key,
    async () => StudyProductService.getProducts(params),
  );

  return { products: data, ...rest };
}

export const StudyProductService = {
  URI: "products",

  async getProduct(id: Id): Promise<StudyProduct> {
    try {
      const response = await productsClient.getApiProductsProductId(id);
      if (!response.data) {
        throw new Error("Product response is empty.");
      }

      return response.data;
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async getProducts(params: StudyProductParams = {}): Promise<Array<StudyProduct>> {
    try {
      const response = await productsClient.getApiProducts(params);
      if (!response.data) {
        throw new Error("Products response is empty.");
      }

      const pagedResult = response.data as ProductBaseModelPagedResult;
      return (pagedResult.items ?? []) as StudyProduct[];
    } catch (error) {
      return toErrorCode(error);
    }
  },

  useProduct(
    id: Id,
  ): Modify<FetchHook<StudyProduct>, { product: StudyProduct }> {
    return useStudyProductQuery(id);
  },

  useProducts(
    params: StudyProductParams = {},
  ): Modify<FetchHook<Array<StudyProduct>>, { products: Array<StudyProduct> }> {
    return useStudyProductsQuery(params);
  },
};
