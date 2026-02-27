"use client";

import { PageRoot } from "@eduriam/ui-core";
import LearnLessonStudySession from "./components/LearnLessonStudySession";

import { useEffect, useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import CoursesAPI from "infrastructure/api/courses/CoursesAPI";

export interface IStudyPage {}
const StudyPage: React.FC<IStudyPage> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lessonIdParam = searchParams.get("lessonId") ?? undefined;
  const courseIdParam = searchParams.get("courseId") ?? undefined;
  const shouldRedirectToHomeOnInitialLoad = useRef(
    !lessonIdParam && !courseIdParam,
  );
  const [lessonId, setLessonId] = useState<Id | undefined>(
    () => lessonIdParam,
  );
  const [isResolvingCourseLesson, setIsResolvingCourseLesson] = useState(
    () => Boolean(courseIdParam && !lessonIdParam),
  );

  useEffect(() => {
    if (shouldRedirectToHomeOnInitialLoad.current) {
      router.replace("/", { scroll: false });
    }
  }, [router]);

  useEffect(() => {
    let isCancelled = false;

    if (lessonIdParam) {
      setLessonId(lessonIdParam);
      setIsResolvingCourseLesson(false);
      router.replace("/study", {
        scroll: false,
      });
      return;
    }

    if (!courseIdParam) {
      setIsResolvingCourseLesson(false);
      return;
    }

    setIsResolvingCourseLesson(true);

    const resolveUpcomingLessonId = async () => {
      try {
        const course = await CoursesAPI.getCourse(courseIdParam);
        if (!isCancelled) {
          setLessonId(course.upcomingLessonId);
          setIsResolvingCourseLesson(false);
          router.replace("/study", {
            scroll: false,
          });
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
  }, [courseIdParam, lessonIdParam, router]);

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
