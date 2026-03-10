"use client";

import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import AdvertisementDialog from "components/advertisement/AdvertisementDialog/AdvertisementDialog";
import type { IStudySessionContainer } from "components/organisms/StudySessionContainer/StudySessionContainer";

import StudySessionAPI from "infrastructure/api/user/courses/study-session/StudySessionAPI";
import useAuth from "infrastructure/services/AuthProvider";

export interface IReviewCourseStudySession {
  courseId: Id;
}

const StudySessionContainer = dynamic<IStudySessionContainer>(
  () => import("components/organisms/StudySessionContainer/StudySessionContainer"),
  {
    ssr: false,
  },
);

const ReviewCourseStudySession: React.FC<IReviewCourseStudySession> = ({
  courseId,
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const [pendingNavigation, setPendingNavigation] = useState<
    (() => void) | null
  >(null);
  const { studySession, isLoading } = StudySessionAPI.useStudySession({
    courseId,
    mode: "review",
  });

  const runWithAdvertisement = useCallback(
    (navigationAction: () => void) => {
      if (user?.role === "PREMIUM_USER") {
        navigationAction();
        return;
      }

      setPendingNavigation(() => navigationAction);
    },
    [user?.role],
  );

  const handleAdvertisementContinue = useCallback(() => {
    if (!pendingNavigation) {
      return;
    }

    const navigationAction = pendingNavigation;
    setPendingNavigation(null);
    navigationAction();
  }, [pendingNavigation]);

  if (isLoading || !studySession) {
    return null;
  }

  const handleQuitOrExit = () => runWithAdvertisement(() => router.back());

  return (
    <>
      <StudySessionContainer
        studySession={studySession}
        courseId={courseId}
        onQuit={handleQuitOrExit}
        onExit={handleQuitOrExit}
      />

      <AdvertisementDialog
        open={Boolean(pendingNavigation)}
        onContinue={handleAdvertisementContinue}
      />
    </>
  );
};

export default ReviewCourseStudySession;
