import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { Article } from "./Articles";

export interface ArticleParams {
  categoryId?: Id;
}

const ArticlesAPI = {
  URI: (courseId: Id) => `courses/${courseId}/articles`,

  useArticles(
    courseId: Id,
    params: ArticleParams = {},
  ): Modify<FetchHook<Array<Article>>, { articles: Array<Article> }> {
    const { data, ...rest } = useAPI<Array<Article>>(
      `${this.URI(courseId)}?${parseQueryParams(params)}`,
    );
    return { articles: data, ...rest };
  },

  useArticle(
    courseId: Id,
    articleId: Id,
  ): Modify<FetchHook<Article>, { article: Article }> {
    const { data, ...rest } = useAPI<Article>(
      `${this.URI(courseId)}/${articleId}`,
    );
    return { article: data, ...rest };
  },
};

export default ArticlesAPI;
