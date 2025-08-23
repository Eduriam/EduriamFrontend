import {
  AudioQuestionAnswer,
  FillInBlankQuestionAnswer,
  QuestionAnswer,
  TextQuestionAnswer,
} from "../QuestionAnswers";

export function isFillInBlankQuestionAnswer(
  questionAnswer: QuestionAnswer,
): questionAnswer is FillInBlankQuestionAnswer {
  return (questionAnswer as FillInBlankQuestionAnswer).type === "FILL_IN_BLANK";
}

export function isTextQuestionAnswer(
  questionAnswer: QuestionAnswer,
): questionAnswer is TextQuestionAnswer {
  return (questionAnswer as TextQuestionAnswer).type === "TextExercise";
}

export function isAudioQuestionAnswer(
  questionAnswer: QuestionAnswer,
): questionAnswer is AudioQuestionAnswer {
  return (questionAnswer as AudioQuestionAnswer).type === "AUDIO";
}
