"use client";

import type { Id } from "domain/models/types/core";
import { useTranslation } from "i18n/client";

import { useCallback, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import AdvertisementDialog from "components/advertisement/AdvertisementDialog/AdvertisementDialog";
import type { IStudySessionContainer } from "components/organisms/StudySessionContainer/StudySessionContainer";

import {
  ApplicationProblemDetailsCode,
  StudyBlockMode,
  type StudySessionModel,
  UserRole,
} from "infrastructure/api/generated/models";
import useAuth from "infrastructure/services/AuthProvider";
import useErrorHandler from "infrastructure/services/ErrorHandler";
import { StudySessionService } from "infrastructure/services/users/StudySessionService";

export interface ILearnLessonStudySession {
  lessonId: Id;
}

const StudySessionContainer = dynamic<IStudySessionContainer>(
  () =>
    import("components/organisms/StudySessionContainer/StudySessionContainer"),
  {
    ssr: false,
  },
);

const LearnLessonStudySession: React.FC<ILearnLessonStudySession> = ({
  lessonId,
}) => {
  const router = useRouter();
  const { t: tError } = useTranslation("error-codes");
  const { user } = useAuth();
  const { setError } = useErrorHandler();
  const [isAdvertisementOpen, setIsAdvertisementOpen] = useState(false);
  const [pendingNavigationTarget, setPendingNavigationTarget] = useState<
    "back" | "review" | null
  >(null);
  const [studySession, setStudySession] = useState<StudySessionModel | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    setStudySession(null);
    setIsLoading(true);

    const fetchStudySession = async () => {
      try {
        const session = await StudySessionService.createStudySession({
          lessonId,
          mode: StudyBlockMode.Learn,
        });

        if (isCancelled) {
          return;
        }

        setStudySession(session);
      } catch (err) {
        if (isCancelled) {
          return;
        }

        if (err === ApplicationProblemDetailsCode.INSUFFICIENT_ENERGY) {
          setError(tError("insufficientEnergy"));
        } else {
          setError();
        }
        router.replace("/", { scroll: false });
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchStudySession();

    return () => {
      isCancelled = true;
    };
  }, [lessonId, router, setError, tError]);

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
      if (user?.role === UserRole.PremiumUser) {
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
