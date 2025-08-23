"use client";

import UpdateLessonOverview from "components/layouts/UpdateLessonOverview/UpdateLessonOverview";

import useAuth from "infrastructure/services/AuthProvider";

export interface IUpdateLessonPage {
  params: {
    lessonId: string;
  };
}

const UpdateLessonPage: React.FC<IUpdateLessonPage> = ({ params }) => {
  const { user } = useAuth();

  return (
    <>
      {params.lessonId && user && (
        <UpdateLessonOverview
          courseId={user.selectedCourse.id}
          lessonId={params.lessonId}
        />
      )}
    </>
  );
};

export default UpdateLessonPage;
