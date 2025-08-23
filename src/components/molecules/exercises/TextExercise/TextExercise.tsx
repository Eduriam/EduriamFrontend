import { useTranslation } from "i18n/client";

import { TextQuestionAnswer as TextQuestionAnswerType } from "infrastructure/api/user/courses/study-session/QuestionAnswers";

import {
  IExerciseComponent,
  TextExercise as TextExerciseType,
} from "../../../../infrastructure/api/user/courses/study-session/Exercises";
import { UserAnswer } from "../../../../infrastructure/api/user/courses/study-session/QuestionAttempt";
import Exercise from "../../../atoms/Exercise/Exercise";
import TextQuestionAnswer from "../../../atoms/question-answers/TextQuestionAnswer/TextQuestionAnswer";

export interface ITextExercise extends IExerciseComponent {
  exercise: TextExerciseType;
}

const ANSWER_LENGTH_BREAKPOINT = 30;

const TextExercise: React.FC<ITextExercise> = ({ exercise, onContinue }) => {
  const { t } = useTranslation("common");
  const questionAnswer: TextQuestionAnswerType = {
    id: exercise.id,
    type: "TextExercise",
    question: exercise.textL1,
    answer: exercise.textL2,
    answerAudioUrl: exercise.textL2AudioUrl,
    lessonItemId: exercise.lessonItemId,
  };

  return (
    <Exercise
      assignmentTitle={t("exercises.textExercise.assignmentTitle")}
      onContinue={(arr: Array<UserAnswer>) => {
        onContinue?.(arr, false);
      }}
      imageUrl={exercise.imageUrl}
      questionAnswers={[questionAnswer]}
      questionAnswerComponents={[
        {
          component: TextQuestionAnswer,
          props: {
            questionAnswer: questionAnswer,
            characterButtons: ["'"],
            rows:
              questionAnswer.answer.length > ANSWER_LENGTH_BREAKPOINT
                ? "long"
                : "short",
          },
        },
      ]}
    />
  );
};

export default TextExercise;
