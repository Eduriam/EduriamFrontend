"use client";

import { PageRoot } from "@eduriam/ui-core";
import { Id } from "domain/models/types/core";
import { parseId } from "util/functions/api";

import { useEffect, useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import CoursesAPI from "infrastructure/api/courses/CoursesAPI";

import LearnLessonStudySession from "./components/LearnLessonStudySession";

export interface IStudyPage {}
const StudyPage: React.FC<IStudyPage> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lessonIdRaw = searchParams.get("lessonId");
  const courseIdRaw = searchParams.get("courseId");
  const lessonIdParam = parseId(lessonIdRaw);
  const courseIdParam = parseId(courseIdRaw);
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

  useEffect(() => {
    let isCancelled = false;

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
        const course = await CoursesAPI.getCourse(courseIdParam);
        const resolvedLessonId = parseId(course.upcomingLessonId);
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
  }, [courseIdParam, courseIdRaw, lessonIdParam, lessonIdRaw, router]);

  if (isResolvingCourseLesson) {
    return null;
  }

  return (
    <PageRoot data-test="study-page">
      {lessonId && <LearnLessonStudySession lessonId={lessonId} />}
    </PageRoot>
  );
};

export default StudyPage;
