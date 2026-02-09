import { Icon } from "@eduriam/ui-core";

import React from "react";

import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import UserLessonsList from "components/atoms/lists/UserLessonsList/UserLessonsList";

import LessonsAPI from "infrastructure/api/user/courses/lessons/LessonsAPI";

import { useTranslation } from "../../../i18n/client";

export interface ICustomLessonsOverview {
  courseId: Id;
}

const CustomLessonsOverview: React.FC<ICustomLessonsOverview> = ({
  courseId,
}) => {
  const { lessons } = LessonsAPI.useLessons(courseId, {
    custom: true,
  });
  const { t: tCommon } = useTranslation("common");
  const router = useRouter();

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle1" mb={1}>
          {tCommon("navigation.myLessons")}
        </Typography>
        <IconButton onClick={() => router.push("/lessons-create")}>
          <Icon name="add" />
        </IconButton>
      </Box>
      {lessons && lessons.length !== 0 ? (
        <UserLessonsList
          lessons={lessons.map((lesson) => {
            return {
              id: lesson.id,
              name: lesson.name,
              url: `/lessons/${lesson.id}`,
            };
          })}
        />
      ) : (
        <>{tCommon("navigation.noCollectionsCreated")}</>
      )}
    </Box>
  );
};

export default CustomLessonsOverview;
