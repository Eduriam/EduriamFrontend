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
  const [isAdvertisementOpen, setIsAdvertisementOpen] = useState(false);
  const [pendingNavigationTarget, setPendingNavigationTarget] = useState<
    "back" | "review" | null
  >(null);
  const { studySession, isLoading } = StudySessionAPI.useStudySession({
    lessonId,
    mode: "learn",
  });

  const navigate = useCallback(
    (target: "back" | "review") => {
      if (target === "review") {
        router.replace("/review");
        return;
      }

      router.back();
    },
    [router],
  );

  const runWithAdvertisement = useCallback(
    (target: "back" | "review") => {
      if (user?.role === "PREMIUM_USER") {
        navigate(target);
        return;
      }

      setPendingNavigationTarget(target);
      setIsAdvertisementOpen(true);
    },
    [navigate, user?.role],
  );

  const handleAdvertisementContinue = useCallback(() => {
    if (!pendingNavigationTarget) {
      return;
    }

    const target = pendingNavigationTarget;
    setIsAdvertisementOpen(false);
    setPendingNavigationTarget(null);
    navigate(target);
  }, [navigate, pendingNavigationTarget]);

  if (isLoading || !studySession) {
    return null;
  }

  return (
    <>
      <StudySessionContainer
        studySession={studySession}
        lessonId={lessonId}
        onQuit={() => runWithAdvertisement("back")}
        onExit={() => runWithAdvertisement("review")}
      />

      <AdvertisementDialog
        open={isAdvertisementOpen}
        onContinue={handleAdvertisementContinue}
      />
    </>
  );
};

export default LearnLessonStudySession;
