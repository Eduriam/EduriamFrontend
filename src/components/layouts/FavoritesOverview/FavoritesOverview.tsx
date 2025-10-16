import { TabBarPanel } from "@eduriam/ui-core";

import React, { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import LinkCardList from "components/atoms/lists/LinkCardList/LinkCardList";

import LessonItemsAPI from "infrastructure/api/user/courses/lesson-items/LessonItemsAPI";
import LessonsAPI from "infrastructure/api/user/courses/lessons/LessonsAPI";

import { useTranslation } from "../../../i18n/client";

export interface IFavoritesOverview {
  courseId: Id;
}

const FavoritesOverview: React.FC<IFavoritesOverview> = ({ courseId }) => {
  const [value, setValue] = useState("lessons");
  const { lessons } = LessonsAPI.useLessons(courseId, {
    favorite: true,
  });
  const { lessonItems } = LessonItemsAPI.useLessonItems(courseId, {
    favorite: true,
  });
  const { t } = useTranslation("common");

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="subtitle1">{t("categories")}</Typography>
      <TabBarPanel
        onChange={(value) => setValue(value as string)}
        tabs={[
          {
            id: "lessons",
            name: t("navigation.lessons"),
          },
          {
            id: "vocabulary",
            name: t("studying.vocabulary"),
          },
        ]}
        panelContent={
          value === "lessons"
            ? lessons && (
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
            : value === "vocabulary"
              ? lessonItems && (
                  <LinkCardList
                    links={lessonItems.map((item) => {
                      return {
                        id: item.id,
                        name: item.nameL2,
                        secondaryName: item.nameL1,
                        url: `/lesson-items/${item.id}`,
                        imageUrl: item.imageUrl,
                      };
                    })}
                  />
                )
              : undefined
        }
        value={value}
      />
    </Box>
  );
};

export default FavoritesOverview;
