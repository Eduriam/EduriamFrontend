"use client";

import { useSearchParams } from "next/navigation";

import ContentContainer from "components/layouts/ContentContainer/ContentContainer";

import { LessonType } from "infrastructure/api/user/courses/lessons/Lessons";
import { isLessonType } from "infrastructure/api/user/courses/lessons/LessonsGuard";
import useAuth from "infrastructure/services/AuthProvider";

import LessonsOverview from "../../components/layouts/LessonsOverview/LessonsOverview";

export interface ILessonsPage {}

const LessonsPage: React.FC<ILessonsPage> = () => {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  function getLessonType(): LessonType | undefined {
    const lessonType = searchParams?.get("type");
    if (isLessonType(lessonType)) {
      return lessonType;
    } else return undefined;
  }

  const lessonType = getLessonType();

  return (
    <>
      {user && lessonType && (
        <ContentContainer>
          <LessonsOverview
            courseId={user.selectedCourse.id}
            lessonType={lessonType}
          />
        </ContentContainer>
      )}
    </>
  );
};

export default LessonsPage;
