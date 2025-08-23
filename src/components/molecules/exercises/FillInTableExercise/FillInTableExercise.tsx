import { useTranslation } from "i18n/client";

import Exercise from "components/atoms/Exercise/Exercise";
import TableQuestionAnswer from "components/atoms/question-answers/TableQuestionAnswer/TableQuestionAnswer";

import {
  FillInTableExercise as FillInTableExerciseType,
  IExerciseComponent,
} from "infrastructure/api/user/courses/study-session/Exercises";
import { TableQuestionAnswer as TableQuestionAnswerType } from "infrastructure/api/user/courses/study-session/QuestionAnswers";
import { UserAnswer } from "infrastructure/api/user/courses/study-session/QuestionAttempt";

export interface IFillInTableExercise extends IExerciseComponent {
  exercise: FillInTableExerciseType;
}

const FillInTableExercise: React.FC<IFillInTableExercise> = ({
  exercise,
  onContinue,
}) => {
  const { t } = useTranslation("common");
  const questionAnswer: TableQuestionAnswerType = {
    id: exercise.id,
    type: "TABLE",
    question: exercise.questionL2,
    tableRows: exercise.tableRows,
    blankCellCoords: exercise.blankCellCoords,
    lessonItemId: exercise.lessonItemId,
  };

  return (
    <Exercise
      assignmentTitle={t("exercises.fillInTable.assignmentTitle")}
      onContinue={(arr: Array<UserAnswer>) => {
        onContinue?.(arr, false);
      }}
      questionAnswers={[questionAnswer]}
      questionAnswerComponents={[
        {
          component: TableQuestionAnswer,
          props: {
            questionAnswer: questionAnswer,
            characterButtons: ["'"],
          },
        },
      ]}
    />
  );
};

export default FillInTableExercise;
