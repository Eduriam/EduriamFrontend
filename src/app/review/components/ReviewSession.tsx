"use client";

import {
  AtomProgressRating,
  StudySession,
} from "@eduriam/ui-x";
import { useTranslation } from "i18n/client";
import {
  createStudySessionLocalization,
  STUDY_SESSION_DATA_TEST,
} from "util/functions/studySession";

import { useRouter } from "next/navigation";

import StudySessionAPI from "infrastructure/api/user/courses/study-session/StudySessionAPI";

export interface IReviewSession {
  courseId: Id;
}

const ReviewSession: React.FC<IReviewSession> = ({ courseId }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const { studySession, isLoading } = StudySessionAPI.useStudySession({
    courseId,
    mode: "review",
  });

  const localization = createStudySessionLocalization(t);

  const handleFinish = async (
    atomProgressRatings: Array<AtomProgressRating>,
  ) => {
    await StudySessionAPI.updateStudySession({
      courseId,
      atomProgress: atomProgressRatings.map((rating) => ({
        atomId: rating.atomId,
        rating: rating.rating,
      })),
    });
  };

  if (isLoading || !studySession) {
    return null;
  }

  return (
    <StudySession
      studySession={studySession}
      onFinish={handleFinish}
      onExit={() => router.push("/")}
      localization={localization}
      dataTest={STUDY_SESSION_DATA_TEST}
    />
  );
};

export default ReviewSession;
