import { StudySession } from "@eduriam/ui-x";
import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import StudySessionAPI from "infrastructure/api/user/courses/study-session/StudySessionAPI";
import { Notice } from "infrastructure/api/user/notices/Notices";
import useNotices from "infrastructure/services/NoticeProvider";

export interface ILessonStudy {
  courseId: Id;
  lessonId: Id;
}

const LessonStudy: React.FC<ILessonStudy> = ({ courseId, lessonId }) => {
  const { addNotices } = useNotices();
  const router = useRouter();
  const { studySession, isLoading } = StudySessionAPI.useStudySession(
    courseId,
    {
      lessonId,
    },
  );
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("common");
  const { t: tError } = useTranslation("error-codes");

  // Check empty session errors
  useEffect(() => {
    if (!isLoading && !studySession) {
      enqueueSnackbar(tError("studySessionEmpty"), {
        variant: "success",
      });
      router.push("/");
    }
  }, [studySession, isLoading, enqueueSnackbar, tError, router]);

  async function handleSessionFinish(
    studyStats: { correctAnswerCount: number; incorrectAnswerCount: number },
    atomProgressRatings: Array<{ atomId: string; rating: number }>,
  ) {
    // Transform studyStats to old format
    const oldStudyStats = {
      rightAnswers: studyStats.correctAnswerCount,
      wrongAnswers: studyStats.incorrectAnswerCount,
    };

    // Transform atomProgressRatings to UserAnswerDTO format
    const attempts = atomProgressRatings.map((rating) => {
      // Find the study block for this atom
      const studyBlock = studySession?.studyBlocks.find(
        (block) => block.atomId === rating.atomId,
      );

      if (!studyBlock) {
        throw new Error(`Study block with id ${rating.atomId} not found`);
      }

      // Convert rating to answer rating (0-100)
      const answerRating = Math.round(rating.rating * 100);

      return {
        answerRating,
        exerciseId: rating.atomId,
        lessonItemId: studyBlock.atomId, // Assuming atomId maps to lessonItemId
      };
    });

    const { reward } = await StudySessionAPI.updateStudySession(
      courseId,
      attempts,
    );

    const notices: Array<Notice> = [];

    addNotices(
      notices.concat([
        {
          id: "study_stats_notice",
          type: "STUDY_STATS",
          stats: oldStudyStats,
        },
        {
          id: "study_reward_notice",
          type: "REWARD",
          reward: reward,
        },
      ]),
    );
    router.push("/");
  }

  return (
    <>
      {!isLoading && studySession && (
        <StudySession
          studySession={studySession}
          onFinish={handleSessionFinish}
          onExit={() => router.push("/")}
          localizedTexts={{
            continueButton: t("exercise.continue"),
            checkButton: t("exercise.check"),
          }}
        />
      )}
    </>
  );
};

export default LessonStudy;
