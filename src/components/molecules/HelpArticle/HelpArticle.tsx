import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import MarkdownText from "components/atoms/MarkdownText/MarkdownText";

import ArticlesAPI from "infrastructure/api/courses/articles/ArticlesAPI";

export interface IHelpArticle {
  courseId: Id;
  articleId: Id;
}

const HelpArticle: React.FC<IHelpArticle> = ({ courseId, articleId }) => {
  const { article } = ArticlesAPI.useArticle(courseId, articleId);

  return (
    <Box sx={{ width: "100%" }}>
      {article && (
        <>
          <Typography variant="subtitle1">{article.name}</Typography>
          <MarkdownText text={article.text}></MarkdownText>
        </>
      )}
    </Box>
  );
};

export default HelpArticle;
