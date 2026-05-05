"use client";

import {
  AtomProgressRating,
  type ExerciseStudyBlockDTO,
  type ExplanationStudyBlockDTO,
  ReportDialog,
  SelectedStudyBlockData,
  StudyBlockMode,
  StudyBlockType,
  type StudyBlockDTO,
  StudySession,
  type StudySessionDTO,
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

import { useCallback, useMemo, useState } from "react";

import {
  ReportType,
  type StudySessionBlockModel,
  type StudySessionModel,
  UserRole,
} from "infrastructure/api/generated/models";
import { LocalStorageManager } from "infrastructure/repositories/LocalStorageManager";
import useAuth from "infrastructure/services/AuthProvider";
import {
  parseReportProblemType,
  ReportsService,
} from "infrastructure/services/reports/ReportsService";
import { StudySessionService } from "infrastructure/services/users/StudySessionService";

const STUDY_SESSION_AUDIO_MUTED_STORAGE_KEY = "studySession.audioMuted";

export interface IStudySessionContainer {
  studySession: StudySessionModel;
  onQuit: () => void;
  onExit: () => void;
}

const hasObjectContent = (
  content: unknown,
): content is Record<string, unknown> =>
  typeof content === "object" && content !== null && !Array.isArray(content);

type ExerciseStudyBlockContent = ExerciseStudyBlockDTO["content"];
type ExplanationStudyBlockContent = ExplanationStudyBlockDTO["content"];

const isExerciseContent = (
  content: unknown,
): content is ExerciseStudyBlockContent =>
  hasObjectContent(content) && Array.isArray(content.components);

const isExplanationContent = (
  content: unknown,
): content is ExplanationStudyBlockContent =>
  hasObjectContent(content) && Array.isArray(content.scenes);

const toExerciseContent = (content: unknown): ExerciseStudyBlockContent => {
  if (isExerciseContent(content)) {
    return content;
  }

  return { components: [] };
};

const toExplanationContent = (
  content: unknown,
): ExplanationStudyBlockContent => {
  if (isExplanationContent(content)) {
    return content;
  }

  return { scenes: [] };
};

const toUiStudyBlock = (
  studyBlock: StudySessionBlockModel,
): StudyBlockDTO => {
  if (studyBlock.type === StudyBlockType.Explanation) {
    return {
      ...studyBlock,
      type: StudyBlockType.Explanation,
      mode: studyBlock.mode === StudyBlockMode.Review
        ? StudyBlockMode.Review
        : StudyBlockMode.Learn,
      content: toExplanationContent(studyBlock.content),
    };
  }

  return {
    ...studyBlock,
    type: StudyBlockType.Exercise,
    mode: studyBlock.mode === StudyBlockMode.Review
      ? StudyBlockMode.Review
      : StudyBlockMode.Learn,
    content: toExerciseContent(studyBlock.content),
  };
};

const toUiStudySession = (studySession: StudySessionModel): StudySessionDTO => ({
  id: studySession.id,
  studyBlocks: studySession.studyBlocks.map(toUiStudyBlock),
});

const StudySessionContainer: React.FC<IStudySessionContainer> = ({
  studySession,
  onQuit,
  onExit,
}) => {
  const { user } = useAuth();
  const { t } = useTranslation("common");

  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [audioMuted, setAudioMuted] = useState(
    () =>
      typeof window !== "undefined" &&
      LocalStorageManager.getItem<boolean>(
        STUDY_SESSION_AUDIO_MUTED_STORAGE_KEY,
      ) === true,
  );
  const [selectedStudyBlockData, setSelectedStudyBlockData] = useState<
    SelectedStudyBlockData | undefined
  >(undefined);

  const localization = createStudySessionLocalization(t);
  const reportStudyBlockLocalization = createStudyBlockReportLocalization(t);

  const reportProblemTypeSections = useMemo(() => {
    const isCorrector = user?.role === UserRole.Admin;

    return createStudyBlockReportProblemTypeSections(t, {
      studyBlockType: selectedStudyBlockData?.type ?? StudyBlockType.Explanation,
      answerState: selectedStudyBlockData?.answerState ?? null,
      isCorrector,
    });
  }, [selectedStudyBlockData, t, user?.role]);

  const uiStudySession = useMemo(
    () => toUiStudySession(studySession),
    [studySession],
  );

  const handleFinish = async (
    atomProgressRatings: Array<AtomProgressRating>,
  ) => {
    await StudySessionService.submitStudySessionResult(studySession.id, {
      atomProgress: atomProgressRatings.map((rating) => ({
        atomId: rating.atomId,
        rating: rating.rating,
      })),
    });
  };

  const handleAudioMutedChange = useCallback((nextAudioMuted: boolean) => {
    setAudioMuted(nextAudioMuted);
    LocalStorageManager.setItem<boolean>(
      STUDY_SESSION_AUDIO_MUTED_STORAGE_KEY,
      nextAudioMuted,
    );
  }, []);

  return (
    <>
      <StudySession
        studySession={uiStudySession}
        audioMuted={audioMuted}
        onAudioMutedChange={handleAudioMutedChange}
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

          const userAnswer = selectedStudyBlockData.userAnswerReport ?? "";

          await ReportsService.submitReport({
            type: ReportType.StudyBlock,
            problemTypeId: parseReportProblemType(payload.problemTypeId),
            description: payload.description,
            context: {
              studyBlockId: selectedStudyBlockData.id,
              // Generated model requires at least one character.
              answer: userAnswer.trim().length ? userAnswer : " ",
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
