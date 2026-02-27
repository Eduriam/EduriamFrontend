"use client";

import { PageRoot } from "@eduriam/ui-core";
import {
  AtomProgressRating,
  ReportStudyBlockDialog,
  SelectedStudyBlockData,
  StudySession,
} from "@eduriam/ui-x";
import { useTranslation } from "i18n/client";
import {
  STUDY_BLOCK_REPORT_DATA_TEST,
  createStudyBlockReportLocalization,
  createStudyBlockReportProblemTypeSections,
} from "util/functions/studyBlockReportConfig";
import {
  STUDY_SESSION_DATA_TEST,
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
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [selectedStudyBlockData, setSelectedStudyBlockData] = useState<
    SelectedStudyBlockData | undefined
  >(undefined);
  const reportProblemTypeSections = useMemo(() => {
    const isCorrector = (user?.role as string) === "CORRECTOR";

    return createStudyBlockReportProblemTypeSections(t, {
      studyBlockType: selectedStudyBlockData?.type ?? "explanation",
      answerState: selectedStudyBlockData?.answerState ?? null,
      isCorrector,
    });
  }, [selectedStudyBlockData, t, user?.role]);

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
          setSelectedStudyBlockData({
            id: studyBlock.id,
            type: studyBlock.type,
            answerState: studyBlock.answerState,
            userAnswerReport: studyBlock.userAnswerReport,
          });
          setIsReportDialogOpen(true);
        }}
        localization={localization}
        dataTest={STUDY_SESSION_DATA_TEST}
      />
      <ReportStudyBlockDialog
        open={isReportDialogOpen}
        onClose={() => {
          setIsReportDialogOpen(false);
          setSelectedStudyBlockData(undefined);
        }}
        onSubmit={async (payload) => {
          if (!selectedStudyBlockData) {
            return;
          }

          await StudyBlocksReportAPI.reportStudyBlock(
            selectedStudyBlockData.id,
            {
              ...payload,
              userAnswerReport: selectedStudyBlockData.userAnswerReport,
            },
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
