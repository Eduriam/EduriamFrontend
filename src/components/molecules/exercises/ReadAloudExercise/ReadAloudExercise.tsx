import { useTranslation } from "i18n/client";

import { AudioQuestionAnswer as AudioQuestionAnswerType } from "infrastructure/api/user/courses/study-session/QuestionAnswers";

import {
  IExerciseComponent,
  ReadAloudExercise as ReadAloudExerciseType,
} from "../../../../infrastructure/api/user/courses/study-session/Exercises";
import { UserAnswer } from "../../../../infrastructure/api/user/courses/study-session/QuestionAttempt";
import Exercise from "../../../atoms/Exercise/Exercise";
import AudioQuestionAnswer from "../../../atoms/question-answers/AudioQuestionAnswer/AudioQuestionAnswer";

export interface IReadAloudExercise extends IExerciseComponent {
  exercise: ReadAloudExerciseType;
}

const ReadAloudExercise: React.FC<IReadAloudExercise> = ({
  exercise,
  onContinue,
}) => {
  const { t } = useTranslation("common");
  const questionAnswer: AudioQuestionAnswerType = {
    id: exercise.id,
    type: "AUDIO",
    question: exercise.textL2,
    answer: exercise.textL2,
    lessonItemId: exercise.lessonItemId,
  };

  return (
    <Exercise
      assignmentTitle={t("exercises.readAloud.assignmentTitle")}
      onContinue={(arr: Array<UserAnswer>) => {
        onContinue?.(arr, false);
      }}
      imageUrl={exercise.imageUrl}
      questionAnswers={[questionAnswer]}
      questionAnswerComponents={[
        {
          component: AudioQuestionAnswer,
          props: {
            questionAnswer: questionAnswer,
          },
        },
      ]}
      submitBeforeContinue={false}
    />
  );
};

export default ReadAloudExercise;
