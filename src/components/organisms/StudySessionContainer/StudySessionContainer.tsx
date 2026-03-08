"use client";

import {
  AtomProgressRating,
  ReportDialog,
  SelectedStudyBlockData,
  StudySession,
  StudySessionDTO,
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

import { useMemo, useState } from "react";

import ReportsAPI from "infrastructure/api/reports/ReportsAPI";
import StudySessionAPI from "infrastructure/api/user/courses/study-session/StudySessionAPI";
import useAuth from "infrastructure/services/AuthProvider";

export interface IStudySessionContainer {
  studySession: StudySessionDTO;
  lessonId?: Id;
  courseId?: Id;
  onQuit: () => void;
  onExit: () => void;
}

const StudySessionContainer: React.FC<IStudySessionContainer> = ({
  studySession,
  lessonId,
  courseId,
  onQuit,
  onExit,
}) => {
  const { user } = useAuth();
  const { t } = useTranslation("common");

  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [selectedStudyBlockData, setSelectedStudyBlockData] = useState<
    SelectedStudyBlockData | undefined
  >(undefined);

  const localization = createStudySessionLocalization(t);
  const reportStudyBlockLocalization = createStudyBlockReportLocalization(t);

  const reportProblemTypeSections = useMemo(() => {
    const isCorrector = (user?.role as string) === "CORRECTOR";

    return createStudyBlockReportProblemTypeSections(t, {
      studyBlockType: selectedStudyBlockData?.type ?? "explanation",
      answerState: selectedStudyBlockData?.answerState ?? null,
      isCorrector,
    });
  }, [selectedStudyBlockData, t, user?.role]);

  const handleFinish = async (
    atomProgressRatings: Array<AtomProgressRating>,
  ) => {
    await StudySessionAPI.updateStudySession({
      lessonId,
      courseId,
      atomProgress: atomProgressRatings.map((rating) => ({
        atomId: rating.atomId,
        rating: rating.rating,
      })),
    });
  };

  return (
    <>
      <StudySession
        studySession={studySession}
        onFinish={handleFinish}
        onQuit={onQuit}
        onExit={onExit}
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
      <ReportDialog
        open={isReportDialogOpen}
        onClose={() => {
          setIsReportDialogOpen(false);
          setSelectedStudyBlockData(undefined);
        }}
        onSubmit={async (payload) => {
          if (!selectedStudyBlockData) {
            return;
          }

          await ReportsAPI.submitReport({
            type: "STUDY_BLOCK",
            problemTypeId: payload.problemTypeId,
            description: payload.description,
            context: {
              studyBlockId: selectedStudyBlockData.id,
              userAnswer: selectedStudyBlockData.userAnswerReport ?? "",
            },
          });
        }}
        problemTypeSections={reportProblemTypeSections}
        localization={reportStudyBlockLocalization}
        dataTest={STUDY_BLOCK_REPORT_DATA_TEST}
      />
    </>
  );
};

export default StudySessionContainer;
