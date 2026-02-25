"use client";

import { PageRoot } from "@eduriam/ui-core";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import LessonLearningSession from "./components/LessonLearningSession";

export interface IStudyPage {}

const StudyPage: React.FC<IStudyPage> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

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

  return (
    <PageRoot data-test="study-page">
      <LessonLearningSession lessonId={lessonId} />
    </PageRoot>
  );
};

export default StudyPage;
