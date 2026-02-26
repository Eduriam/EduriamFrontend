"use client";

import { PageRoot } from "@eduriam/ui-core";
import { AtomProgressRating, StudySession } from "@eduriam/ui-x";
import { useTranslation } from "i18n/client";
import {
  createStudySessionLocalization,
  STUDY_SESSION_DATA_TEST,
} from "util/functions/studySession";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import StudySessionAPI from "infrastructure/api/user/courses/study-session/StudySessionAPI";

export interface IStudyPage {}

const StudyPage: React.FC<IStudyPage> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useTranslation("common");

  const [lessonId, setLessonId] = useState<Id | undefined>(() => {
    const lessonIdParam = searchParams.get("lessonId");
    return lessonIdParam ?? undefined;
  });

  useEffect(() => {
    const lessonIdParam = searchParams.get("lessonId");

    if (lessonIdParam) {
      setLessonId(lessonIdParam);
      router.replace("/study", {
        scroll: false,
      });
    }
  }, [router, searchParams]);

  const localization = createStudySessionLocalization(t);

  const { studySession, isLoading } = StudySessionAPI.useStudySession({
    lessonId,
    mode: "learn",
  });

  const handleFinish = async (
    atomProgressRatings: Array<AtomProgressRating>,
  ) => {
    await StudySessionAPI.updateStudySession({
      lessonId,
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
    <PageRoot data-test="study-page">
      <StudySession
        studySession={studySession}
        onFinish={handleFinish}
        onExit={() => router.push("/review")}
        localization={localization}
        dataTest={STUDY_SESSION_DATA_TEST}
      />
    </PageRoot>
  );
};

export default StudyPage;
