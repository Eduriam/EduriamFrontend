import { useSnackbar } from "notistack";

import React from "react";

import LessonCreateUpdate from "components/layouts/LessonCreateUpdate/LessonCreateUpdate";

import { optimisticMutationOption } from "infrastructure/api/API";
import LessonsAPI from "infrastructure/api/user/courses/lessons/LessonsAPI";

import { useTranslation } from "../../../i18n/client";

export interface IUpdateLessonOverview {
  courseId: Id;
  lessonId: Id;
}

const UpdateLessonOverview: React.FC<IUpdateLessonOverview> = ({
  courseId,
  lessonId,
}) => {
  const { lesson, mutate } = LessonsAPI.useLesson(courseId, lessonId);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("common");

  return (
    <>
      {lesson && (
        <LessonCreateUpdate
          courseId={courseId}
          lesson={{
            name: lesson.name,
            description: lesson.description,
            items: lesson.items || [],
            id: lesson.id,
          }}
          onSave={async (savedLesson) => {
            const data = {
              id: lessonId,
              name: savedLesson.name,
              description: savedLesson.description,
              items: savedLesson.items,
            };

            await mutate(
              LessonsAPI.updateCustomLesson(courseId, data),
              optimisticMutationOption(data),
            );

            enqueueSnackbar(t("userLessons.lessonSaved"), {
              variant: "success",
            });
          }}
        />
      )}
    </>
  );
};

export default UpdateLessonOverview;
