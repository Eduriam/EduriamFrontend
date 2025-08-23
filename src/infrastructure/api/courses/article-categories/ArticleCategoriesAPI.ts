import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { ArticleCategory } from "./ArticleCategories";

export interface ArticleCategoryParams {}

const ArticleCategoriesAPI = {
  URI: (courseId: Id) => `courses/${courseId}/article-categories`,

  useArticleCategories(
    courseId: Id,
    params: ArticleCategoryParams = {},
  ): Modify<
    FetchHook<Array<ArticleCategory>>,
    { articleCategories: Array<ArticleCategory> }
  > {
    const { data, ...rest } = useAPI<Array<ArticleCategory>>(
      `${this.URI(courseId)}?${parseQueryParams(params)}`,
    );
    return { articleCategories: data, ...rest };
  },
};

export default ArticleCategoriesAPI;
