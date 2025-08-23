import { useTranslation } from "i18n/client";

import { AudioQuestionAnswer as AudioQuestionAnswerType } from "infrastructure/api/user/courses/study-session/QuestionAnswers";

import {
  IExerciseComponent,
  RepeatAudioExercise as RepeatAudioExerciseType,
} from "../../../../infrastructure/api/user/courses/study-session/Exercises";
import { UserAnswer } from "../../../../infrastructure/api/user/courses/study-session/QuestionAttempt";
import Exercise from "../../../atoms/Exercise/Exercise";
import ListenButton from "../../../atoms/ListenButton/ListenButton";
import AudioQuestionAnswer from "../../../atoms/question-answers/AudioQuestionAnswer/AudioQuestionAnswer";

export interface IRepeatAudioExercise extends IExerciseComponent {
  exercise: RepeatAudioExerciseType;
}

const RepeatAudioExercise: React.FC<IRepeatAudioExercise> = ({
  exercise,
  onContinue,
}) => {
  const { t } = useTranslation("common");
  const questionAnswer: AudioQuestionAnswerType = {
    id: exercise.id,
    type: "AUDIO",
    answer: exercise.textL2,
    lessonItemId: exercise.lessonItemId,
  };

  return (
    <Exercise
      assignmentTitle={t("exercises.repeatAudio.assignmentTitle")}
      onContinue={(arr: Array<UserAnswer>) => {
        onContinue?.(arr, false);
      }}
      questionAnswers={[questionAnswer]}
      questionAnswerComponents={[
        {
          component: AudioQuestionAnswer,
          props: {
            questionAnswer: questionAnswer,
          },
        },
      ]}
      componentsAboveQuestions={
        <ListenButton audioLink={exercise.audioUrl} playOnMount={true} />
      }
      submitBeforeContinue={false}
    />
  );
};

export default RepeatAudioExercise;
