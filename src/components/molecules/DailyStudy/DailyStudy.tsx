import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import StudySession from "components/molecules/StudySession/StudySession";

import { QuestionAttempt } from "infrastructure/api/user/courses/study-session/QuestionAttempt";
import StudySessionAPI from "infrastructure/api/user/courses/study-session/StudySessionAPI";
import { Notice, StudyStats } from "infrastructure/api/user/notices/Notices";
import useNotices from "infrastructure/services/NoticeProvider";

export interface IDailyStudy {
  courseId: Id;
}

const DailyStudy: React.FC<IDailyStudy> = ({ courseId }) => {
  const { addNotices } = useNotices();
  const router = useRouter();
  const { exercises, isLoading } = StudySessionAPI.useStudySession(courseId);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("error-codes");

  // Check empty session errors
  useEffect(() => {
    if (!isLoading && !Array.isArray(exercises)) {
      enqueueSnackbar(t("studySessionEmpty"), {
        variant: "success",
      });
      router.push("/");
    }
  }, [exercises, isLoading, enqueueSnackbar, t, router]);

  async function handleSessionFinish(
    studyStats: StudyStats,
    attempts: Array<QuestionAttempt>,
  ) {
    const { reward } = await StudySessionAPI.updateStudySession(
      courseId,
      attempts.map((attempt) => {
        const totalAnswers = attempt.states.length;
        const rightAnswers = attempt.states.filter(
          (answer) => answer === "RIGHT",
        ).length;

        const answerRating =
          rightAnswers === totalAnswers
            ? 100
            : rightAnswers === 0
              ? 0
              : (rightAnswers / totalAnswers) * 100;

        return {
          answerRating,
          exerciseId: attempt.exerciseId,
          lessonItemId: attempt.lessonItemId,
        };
      }),
    );

    /* const notices: Array<Notice> =
      user?.role === "PREMIUM_USER" ? []
        : [
            {
              id: "study_advertisement_notice",
              type: "ADVERTISEMENT",
            },
          ];*/

    const notices: Array<Notice> = [];

    addNotices(
      notices.concat([
        {
          id: "study_stats_notice",
          type: "STUDY_STATS",
          stats: studyStats,
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
      {!isLoading && exercises && (
        <StudySession
          exercises={exercises}
          onFinish={handleSessionFinish}
          onExit={() => router.push("/")}
        />
      )}
    </>
  );
};

export default DailyStudy;
