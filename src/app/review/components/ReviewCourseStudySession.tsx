"use client";

import StudySessionContainer from "components/organisms/StudySessionContainer/StudySessionContainer";

import { useRouter } from "next/navigation";

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

  return (
    <StudySessionContainer
      studySession={studySession}
      courseId={courseId}
      onExit={() => router.push("/")}
    />
  );
};

export default ReviewCourseStudySession;
