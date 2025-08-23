"use client";

import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";

import { useRouter } from "next/navigation";

import LessonCreateUpdate from "components/layouts/LessonCreateUpdate/LessonCreateUpdate";

import LessonsAPI from "infrastructure/api/user/courses/lessons/LessonsAPI";
import useAuth from "infrastructure/services/AuthProvider";

export interface ICreateLessonPage {}

const CreateLessonPage: React.FC<ICreateLessonPage> = () => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <>
      {user && (
        <LessonCreateUpdate
          courseId={user.selectedCourse.id}
          lesson={{
            id: "",
            name: "",
            description: "",
            items: [],
          }}
          onSave={async (savedLesson) => {
            const data = {
              name: savedLesson.name,
              description: savedLesson.description,
              items: savedLesson.items,
            };

            await LessonsAPI.createCustomLesson(user.selectedCourse.id, data);
            enqueueSnackbar(t("userLessons.lessonCreated"), {
              variant: "success",
            });
            router.push("/user-lessons");
          }}
          isCreate={true}
        />
      )}
    </>
  );
};

export default CreateLessonPage;
