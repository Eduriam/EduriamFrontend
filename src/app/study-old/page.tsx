"use client";

import { useSearchParams } from "next/navigation";

import DailyStudy from "components/molecules/DailyStudy/DailyStudy";
import LessonStudy from "components/molecules/LessonStudy/LessonStudy";

import useAuth from "infrastructure/services/AuthProvider";

export interface IStudyPage {}

const StudyPage: React.FC<IStudyPage> = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("lessonId");
  const lessonId = search !== null ? search : undefined;

  const { user } = useAuth();

  return (
    <>
      {user?.selectedCourse.id ? (
        lessonId ? (
          <LessonStudy lessonId={lessonId} courseId={user.selectedCourse.id} />
        ) : (
          <DailyStudy courseId={user.selectedCourse.id} />
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default StudyPage;
