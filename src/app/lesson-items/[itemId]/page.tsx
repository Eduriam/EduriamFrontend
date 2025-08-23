"use client";

import LessonItemOverview from "components/layouts/LessonItemOverview/LessonItemOverview";

import useAuth from "infrastructure/services/AuthProvider";

export interface ILessonItemPage {
  params: {
    itemId: Id;
  };
}

const LessonItemPage: React.FC<ILessonItemPage> = ({ params }) => {
  const { user } = useAuth();

  return (
    <>
      {user && (
        <LessonItemOverview
          courseId={user.selectedCourse.id}
          lessonItemId={params.itemId}
        />
      )}
    </>
  );
};

export default LessonItemPage;
