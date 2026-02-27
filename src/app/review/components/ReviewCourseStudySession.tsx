"use client";

import { useRouter } from "next/navigation";

import StudySessionContainer from "components/organisms/StudySessionContainer/StudySessionContainer";

import StudySessionAPI from "infrastructure/api/user/courses/study-session/StudySessionAPI";

export interface IReviewCourseStudySession {
  courseId: Id;
}

const ReviewCourseStudySession: React.FC<IReviewCourseStudySession> = ({
  courseId,
}) => {
  const router = useRouter();
  const { studySession, isLoading } = StudySessionAPI.useStudySession({
    courseId,
    mode: "review",
  });

  if (isLoading || !studySession) {
    return null;
  }

  const handleQuitOrExit = () => router.back();

  return (
    <StudySessionContainer
      studySession={studySession}
      courseId={courseId}
      onQuit={handleQuitOrExit}
      onExit={handleQuitOrExit}
    />
  );
};

export default ReviewCourseStudySession;
