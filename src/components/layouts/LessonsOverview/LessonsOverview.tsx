import { categories } from "config/config";

import React, { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TabBarPanel from "components/atoms/TabBarPanel/TabBarPanel";
import LinkCardList from "components/atoms/lists/LinkCardList/LinkCardList";
import { LanguageLevel } from "components/molecules/forms/SelectLevelForm/config";

import { LessonType } from "infrastructure/api/user/courses/lessons/Lessons";
import LessonsAPI from "infrastructure/api/user/courses/lessons/LessonsAPI";

import { useTranslation } from "../../../i18n/client";

export interface ILessonsOverview {
  courseId: Id;
  lessonType: LessonType;
}

const LessonsOverview: React.FC<ILessonsOverview> = ({
  courseId,
  lessonType,
}) => {
  const [value, setValue] = useState(categories[0].id);
  const { lessons, isLoading } = LessonsAPI.useLessons(courseId, {
    type: lessonType,
    level: value as LanguageLevel,
  });
  const { t } = useTranslation("common");

  return (
    <>
      {isLoading || (
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1">{t("categories")}</Typography>
          <TabBarPanel
            onChange={(value) => setValue(value)}
            tabs={categories}
            panelContent={
              lessons && (
                <LinkCardList
                  links={lessons.map((lesson) => {
                    return {
                      id: lesson.id,
                      name: lesson.name,
                      url: `/lessons/${lesson.id}`,
                    };
                  })}
                />
              )
            }
            value={value}
          />
        </Box>
      )}
    </>
  );
};

export default LessonsOverview;
