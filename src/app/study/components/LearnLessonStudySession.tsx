"use client";

import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import AdvertisementDialog from "components/advertisement/AdvertisementDialog/AdvertisementDialog";
import type { IStudySessionContainer } from "components/organisms/StudySessionContainer/StudySessionContainer";

import StudySessionAPI from "infrastructure/api/user/courses/study-session/StudySessionAPI";
import useAuth from "infrastructure/services/AuthProvider";

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
  const { user } = useAuth();
  const [pendingNavigation, setPendingNavigation] = useState<
    (() => void) | null
  >(null);
  const { studySession, isLoading } = StudySessionAPI.useStudySession({
    lessonId,
    mode: "learn",
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

  return (
    <>
      <StudySessionContainer
        studySession={studySession}
        lessonId={lessonId}
        onQuit={() => runWithAdvertisement(() => router.back())}
        onExit={() => runWithAdvertisement(() => router.replace("/review"))}
      />

      <AdvertisementDialog
        open={Boolean(pendingNavigation)}
        onContinue={handleAdvertisementContinue}
      />
    </>
  );
};

export default LearnLessonStudySession;
