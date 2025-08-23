import Box from "@mui/material/Box";

import LinkCardList from "components/atoms/lists/LinkCardList/LinkCardList";

import ArticlesAPI from "infrastructure/api/courses/articles/ArticlesAPI";

export interface IHelpArticlesOverview {
  courseId: Id;
  categoryId: Id;
}

const HelpArticlesOverview: React.FC<IHelpArticlesOverview> = ({
  courseId,
  categoryId,
}) => {
  const { articles } = ArticlesAPI.useArticles(courseId, {
    categoryId: categoryId,
  });

  return (
    <Box sx={{ width: "100%" }}>
      {articles && (
        <LinkCardList
          links={articles.map((article) => {
            return {
              id: article.id,
              name: article.name,
              url: `/help/${categoryId}/${article.id}`,
            };
          })}
        />
      )}
    </Box>
  );
};

export default HelpArticlesOverview;
