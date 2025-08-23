import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import LessonsAPI from "infrastructure/api/user/courses/lessons/LessonsAPI";

import LinkCardList from "../lists/LinkCardList/LinkCardList";

export interface ILessonsSearchResults {
  courseId: Id;
  searchPrompt: string;
}

const LessonsSearchResults: React.FC<ILessonsSearchResults> = ({
  courseId,
  searchPrompt,
}) => {
  const { lessons } = LessonsAPI.useLessons(courseId, {
    searchName: searchPrompt.toLowerCase(),
  });
  const { t } = useTranslation("common");

  return (
    <>
      {lessons && lessons.length > 0 ? (
        <LinkCardList
          links={lessons.map((lesson) => {
            return {
              id: lesson.id,
              name: lesson.name,
              url: `/lessons/${lesson.id}`,
            };
          })}
        />
      ) : searchPrompt ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body2">{t("search.noLessonsFound")}</Typography>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default LessonsSearchResults;
