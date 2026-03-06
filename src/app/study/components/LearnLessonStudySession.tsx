"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import type { IStudySessionContainer } from "components/organisms/StudySessionContainer/StudySessionContainer";

import StudySessionAPI from "infrastructure/api/user/courses/study-session/StudySessionAPI";

export interface ILearnLessonStudySession {
  lessonId: Id;
}

const StudySessionContainer = dynamic<IStudySessionContainer>(
  () => import("components/organisms/StudySessionContainer/StudySessionContainer"),
  {
    ssr: false,
  },
);

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
      onQuit={() => router.back()}
      onExit={() => router.replace("/review")}
    />
  );
};

export default LearnLessonStudySession;
