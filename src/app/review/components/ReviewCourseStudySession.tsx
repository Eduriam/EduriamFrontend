"use client";

import type { Id } from "domain/models/types/core";

import { useCallback, useState } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import AdvertisementDialog from "components/advertisement/AdvertisementDialog/AdvertisementDialog";
import type { IStudySessionContainer } from "components/organisms/StudySessionContainer/StudySessionContainer";

import { StudyBlockMode, UserRole } from "infrastructure/api/generated/models";
import useAuth from "infrastructure/services/AuthProvider";
import { StudySessionService } from "infrastructure/services/users/StudySessionService";

export interface IReviewCourseStudySession {
  courseId: Id;
}

const StudySessionContainer = dynamic<IStudySessionContainer>(
  () =>
    import("components/organisms/StudySessionContainer/StudySessionContainer"),
  {
    ssr: false,
  },
);

const ReviewCourseStudySession: React.FC<IReviewCourseStudySession> = ({
  courseId,
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const [isAdvertisementOpen, setIsAdvertisementOpen] = useState(false);
  const [pendingNavigationTarget, setPendingNavigationTarget] = useState<
    "back" | null
  >(null);
  const { studySession, isLoading } = StudySessionService.useStudySession({
    courseId,
    mode: StudyBlockMode.Review,
  });

  const navigate = useCallback(() => {
    router.back();
  }, [router]);

  const runWithAdvertisement = useCallback(
    (target: "back") => {
      if (user?.role === UserRole.PremiumUser) {
        navigate();
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

    setIsAdvertisementOpen(false);
    setPendingNavigationTarget(null);
    navigate();
  }, [navigate, pendingNavigationTarget]);

  if (isLoading || !studySession) {
    return null;
  }

  const handleQuitOrExit = () => runWithAdvertisement("back");

  return (
    <>
      <StudySessionContainer
        studySession={studySession}
        onQuit={handleQuitOrExit}
        onExit={handleQuitOrExit}
      />

      <AdvertisementDialog
        open={isAdvertisementOpen}
        onContinue={handleAdvertisementContinue}
      />
    </>
  );
};

export default ReviewCourseStudySession;

