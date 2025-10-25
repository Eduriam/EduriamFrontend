import { AnswerState } from "@eduriam/ui-x";

export type QuestionAttempt = UserAnswer;

export interface UserAnswer {
  states: Array<AnswerState>;
  answers: Array<string>;
  exerciseId: Id;
  lessonItemId: Id;
}

export interface UserAnswerDTO {
  exerciseId: Id;
  answerRating: number;
  lessonItemId: Id;
}
