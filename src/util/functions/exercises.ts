import FillTheBlank from "../../components/atoms/FillTheBlank/FillTheBlank";
import TextQuestionAnswer from "../../components/atoms/question-answers/TextQuestionAnswer/TextQuestionAnswer";
import { QuestionAnswer } from "../../infrastructure/api/user/courses/study-session/QuestionAnswers";
import {
  isFillInBlankQuestionAnswer,
  isTextQuestionAnswer,
} from "../../infrastructure/api/user/courses/study-session/guards/questionGuard";

export function getQuestionAnswerComponent(
  questionAnswer: QuestionAnswer,
): React.ElementType {
  if (isFillInBlankQuestionAnswer(questionAnswer)) {
    return FillTheBlank;
  }

  if (isTextQuestionAnswer(questionAnswer)) {
    return TextQuestionAnswer;
  }

  return TextQuestionAnswer;
}

export function removeInterpunction(text: string) {
  text = text.replace(/[.,?!]/g, "");
  text = text.replace(/\s{2,}/g, " ");

  return text;
}
