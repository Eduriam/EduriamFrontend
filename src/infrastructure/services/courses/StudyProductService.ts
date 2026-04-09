import type { Id } from "domain/models/types/core";
import type { Language } from "domain/models/types/languages";
import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import { FetchHook } from "infrastructure/api/API";
import { getProducts } from "infrastructure/api/generated/products/products";
import type {
  ProductModelBase,
  ProductModelBasePagedResult,
} from "infrastructure/api/generated/models";
import useAPI from "infrastructure/api/hooks/useAPI";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const productsClient = getProducts();

export type StudyProductType = "course" | "learning-path" | "study-path";

export interface StudyProductChapterSummary {
  id: Id;
  name: string;
  userProgress?: number | null;
}

export interface StudyPathProductSummary {
  id: Id;
  name: string;
  logoId?: string | null;
  userProgress?: number | null;
  premium?: boolean;
}

export type StudyProduct = ProductModelBase & {
  language?: Language;
  type?: StudyProductType;
  chapters?: StudyProductChapterSummary[];
  courses?: StudyPathProductSummary[];
};

export type CourseProduct = StudyProduct & {
  type?: "course";
  chapters?: StudyProductChapterSummary[];
};

export type StudyPathProduct = StudyProduct & {
  type?: "learning-path" | "study-path";
  courses?: StudyPathProductSummary[];
};

export interface StudyProductParams {}

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

      return response.data as StudyProduct;
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

      const pagedResult = response.data as ProductModelBasePagedResult;
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
