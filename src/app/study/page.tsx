"use client";

import { PageRoot } from "@eduriam/ui-core";
import { PREMIUM_MESSAGES, getPremiumRoute } from "app/premium/premiumMessages";
import { Id } from "domain/models/types/core";
import { parseId } from "util/functions/api";

import { useEffect, useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { UserRole } from "infrastructure/api/generated/models";
import { StudyProductService } from "infrastructure/services/courses/StudyProductService";
import useAuth from "infrastructure/services/AuthProvider";

import LearnLessonStudySession from "./components/LearnLessonStudySession";

export interface IStudyPage {}
const StudyPage: React.FC<IStudyPage> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lessonIdRaw = searchParams.get("lessonId");
  const courseIdRaw = searchParams.get("courseId");
  const lessonIdParam = parseId(lessonIdRaw);
  const courseIdParam = parseId(courseIdRaw);
  const { user } = useAuth();
  const shouldRedirectToHomeOnInitialLoad = useRef(
    !lessonIdParam && !courseIdParam,
  );
  const [lessonId, setLessonId] = useState<Id | undefined>(() => lessonIdParam);
  const [isResolvingCourseLesson, setIsResolvingCourseLesson] = useState(() =>
    Boolean(courseIdParam && !lessonIdParam),
  );

  useEffect(() => {
    if (shouldRedirectToHomeOnInitialLoad.current) {
      router.replace("/", { scroll: false });
    }
  }, [router]);

  const hasNoEnergy = (user?.energy ?? 0) <= 0;
  const isPremiumUser = user?.role === UserRole.PremiumUser;
  const hasStudySessionRequest =
    lessonIdParam !== undefined || courseIdParam !== undefined;
  const shouldRedirectToPremiumBecauseNoEnergy =
    Boolean(user && hasStudySessionRequest && !isPremiumUser && hasNoEnergy);

  useEffect(() => {
    if (shouldRedirectToPremiumBecauseNoEnergy) {
      router.replace(getPremiumRoute(PREMIUM_MESSAGES.noEnergyLeft), {
        scroll: false,
      });
    }
  }, [router, shouldRedirectToPremiumBecauseNoEnergy]);

  useEffect(() => {
    let isCancelled = false;

    if (shouldRedirectToPremiumBecauseNoEnergy) {
      return;
    }

    if (lessonIdRaw && lessonIdParam === undefined) {
      router.replace("/", { scroll: false });
      return;
    }

    if (courseIdRaw && courseIdParam === undefined) {
      router.replace("/", { scroll: false });
      return;
    }

    if (lessonIdParam !== undefined) {
      setLessonId(lessonIdParam);
      setIsResolvingCourseLesson(false);
      router.replace("/study", {
        scroll: false,
      });
      return;
    }

    if (courseIdParam === undefined) {
      setIsResolvingCourseLesson(false);
      return;
    }

    setIsResolvingCourseLesson(true);

    const resolveUpcomingLessonId = async () => {
      try {
        const product = await StudyProductService.getProduct(courseIdParam);
        const resolvedLessonId = parseId(product.upcomingLessonId);
        if (!isCancelled) {
          setLessonId(resolvedLessonId);
          setIsResolvingCourseLesson(false);
          if (resolvedLessonId === undefined) {
            router.replace("/", { scroll: false });
            return;
          }
          router.replace("/study", { scroll: false });
        }
      } catch {
        if (!isCancelled) {
          setLessonId(undefined);
          setIsResolvingCourseLesson(false);
        }
      }
    };

    resolveUpcomingLessonId();

    return () => {
      isCancelled = true;
    };
  }, [
    courseIdParam,
    courseIdRaw,
    lessonIdParam,
    lessonIdRaw,
    router,
    shouldRedirectToPremiumBecauseNoEnergy,
  ]);

  if (isResolvingCourseLesson || shouldRedirectToPremiumBecauseNoEnergy) {
    return null;
  }

  return (
    <PageRoot data-test="study-page">
      {lessonId && <LearnLessonStudySession lessonId={lessonId} />}
    </PageRoot>
  );
};

export default StudyPage;
