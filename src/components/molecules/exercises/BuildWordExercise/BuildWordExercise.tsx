import { useTranslation } from "i18n/client";

import Exercise from "components/atoms/Exercise/Exercise";
import BuildWordQuestionAnswer from "components/atoms/question-answers/BuildWordQuestionAnswer/BuildWordQuestionAnswer";

import {
  BuildWordExercise as BuildWordExerciseType,
  IExerciseComponent,
} from "infrastructure/api/user/courses/study-session/Exercises";
import { BuildWordQuestionAnswer as BuildWordQuestionAnswerType } from "infrastructure/api/user/courses/study-session/QuestionAnswers";
import { UserAnswer } from "infrastructure/api/user/courses/study-session/QuestionAttempt";

export interface IBuildWordExercise extends IExerciseComponent {
  exercise: BuildWordExerciseType;
}

const BuildWordExercise: React.FC<IBuildWordExercise> = ({
  exercise,
  onContinue,
}) => {
  const { t } = useTranslation("common");
  const questionAnswer: BuildWordQuestionAnswerType = {
    type: "BuildWordExercise",
    id: exercise.id,
    question: exercise.wordL1,
    answer: exercise.wordL2,
    letters: exercise.letters,
    lessonItemId: exercise.lessonItemId,
  };

  return (
    <Exercise
      assignmentTitle={t("exercises.buildTheWord.assignmentTitle")}
      onContinue={(arr: Array<UserAnswer>) => {
        onContinue?.(arr, false);
      }}
      imageUrl={exercise.imageUrl}
      questionAnswers={[questionAnswer]}
      questionAnswerComponents={[
        {
          component: BuildWordQuestionAnswer,
          props: {
            questionAnswer: questionAnswer,
          },
        },
      ]}
    />
  );
};

export default BuildWordExercise;
