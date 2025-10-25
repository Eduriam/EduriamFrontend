import { AnswerState, StudySession } from "@eduriam/ui-x";
import { useTranslation } from "i18n/client";

import PlacementTestAPI from "infrastructure/api/courses/placement-test/PlacementTestAPI";

import { LanguageLevel } from "../forms/SelectLevelForm/config";

export interface IPlacementTest {
  courseId: Id;
  onSubmit: (answer: LanguageLevel) => void;
  onCancel: () => void;
}

const PlacementTest: React.FC<IPlacementTest> = ({
  courseId,
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation("common");
  const { studySession, isLoading } =
    PlacementTestAPI.usePlacementTest(courseId);

  async function handleSessionFinish(
    studyStats: { correctAnswerCount: number; incorrectAnswerCount: number },
    atomProgressRatings: Array<{ atomId: string; rating: number }>,
  ) {
    // Transform atomProgressRatings to QuestionAttempt format
    const attempts = atomProgressRatings.map((rating) => {
      // Find the study block for this atom
      const studyBlock = studySession?.studyBlocks.find(
        (block) => block.atomId === rating.atomId,
      );

      if (!studyBlock) {
        throw new Error(`Study block with id ${rating.atomId} not found`);
      }

      // Convert rating to states array (simplified logic)
      const states: AnswerState[] =
        rating.rating >= 0.8 ? ["RIGHT"] : ["WRONG"];

      return {
        exerciseId: rating.atomId,
        lessonItemId: studyBlock.atomId, // Assuming atomId maps to lessonItemId
        states,
        answers: [], // Empty answers array
      };
    });

    const { userLevel } = await PlacementTestAPI.updatePlacementTest(
      courseId,
      attempts,
    );
    onSubmit(userLevel);
  }

  return (
    <>
      {!isLoading && studySession && (
        <StudySession
          studySession={studySession}
          onFinish={handleSessionFinish}
          onExit={() => onCancel()}
          localizedTexts={{
            continueButton: t("exercise.continue"),
            checkButton: t("exercise.check"),
          }}
        />
      )}
    </>
  );
};

export default PlacementTest;
