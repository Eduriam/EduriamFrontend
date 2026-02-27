"use client";

import StudySessionContainer from "components/organisms/StudySessionContainer/StudySessionContainer";

import { useRouter } from "next/navigation";

import StudySessionAPI from "infrastructure/api/user/courses/study-session/StudySessionAPI";

export interface ILearnLessonStudySession {
  lessonId: Id;
}

const LearnLessonStudySession: React.FC<ILearnLessonStudySession> = ({
  lessonId,
}) => {
  const router = useRouter();
  const { studySession, isLoading } = StudySessionAPI.useStudySession({
    lessonId,
    mode: "learn",
  });

  if (isLoading || !studySession) {
    return null;
  }

  return (
    <StudySessionContainer
      studySession={studySession}
      lessonId={lessonId}
      onExit={() => router.push("/")}
    />
  );
};

export default LearnLessonStudySession;
