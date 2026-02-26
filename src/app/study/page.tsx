"use client";

import { PageRoot } from "@eduriam/ui-core";
import {
  AtomProgressRating,
  ReportStudyBlockDialog,
  StudySession,
} from "@eduriam/ui-x";
import { useTranslation } from "i18n/client";
import {
  STUDY_BLOCK_REPORT_DATA_TEST,
  STUDY_SESSION_DATA_TEST,
  createStudyBlockReportProblemTypeSections,
  createStudyBlockReportLocalization,
  createStudySessionLocalization,
} from "util/functions/studySessionConfig";

import { useEffect, useMemo, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import StudyBlocksReportAPI from "infrastructure/api/study-blocks/StudyBlocksReportAPI";
import StudySessionAPI from "infrastructure/api/user/courses/study-session/StudySessionAPI";
import useAuth from "infrastructure/services/AuthProvider";

export interface IStudyPage {}

const StudyPage: React.FC<IStudyPage> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
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
  const reportStudyBlockLocalization = createStudyBlockReportLocalization(t);
  const allReportProblemTypeSections = useMemo(
    () => createStudyBlockReportProblemTypeSections(t),
    [t],
  );
  const reportProblemTypeSections = useMemo(() => {
    const isCorrector = (user?.role as string) === "CORRECTOR";
    const targetSectionId = isCorrector ? "corrector-problems" : "user-problems";

    return allReportProblemTypeSections.filter(
      (section) => section.id === targetSectionId,
    );
  }, [allReportProblemTypeSections, user?.role]);

  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [selectedStudyBlockId, setSelectedStudyBlockId] = useState<
    Id | undefined
  >(undefined);

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
        onExit={() => router.push("/")}
        onReportStudyBlockClick={(studyBlock) => {
          setSelectedStudyBlockId(studyBlock.id);
          setIsReportDialogOpen(true);
        }}
        localization={localization}
        dataTest={STUDY_SESSION_DATA_TEST}
      />
      <ReportStudyBlockDialog
        open={isReportDialogOpen}
        onClose={() => {
          setIsReportDialogOpen(false);
          setSelectedStudyBlockId(undefined);
        }}
        onSubmit={async (payload) => {
          if (!selectedStudyBlockId) {
            return;
          }

          await StudyBlocksReportAPI.reportStudyBlock(
            selectedStudyBlockId,
            payload,
          );
        }}
        problemTypeSections={reportProblemTypeSections}
        localization={reportStudyBlockLocalization}
        dataTest={STUDY_BLOCK_REPORT_DATA_TEST}
      />
    </PageRoot>
  );
};

export default StudyPage;
