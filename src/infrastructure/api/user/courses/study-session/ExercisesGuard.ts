import {
  BuildWordExercise,
  Exercise,
  FillInSentenceExercise,
  FillInTableExercise,
  ListeningExercise,
  MatchingExercise,
  ReadAloudExercise,
  ReadingExercise,
  RepeatAudioExercise,
  ShortListeningExercise,
  SpeechExercise,
  TextExercise,
} from "./Exercises";

export function isListeningExercise(
  exercise: Exercise,
): exercise is ListeningExercise {
  return (exercise as ListeningExercise).type === "ListeningExercise";
}

export function isShortListeningExercise(
  exercise: Exercise,
): exercise is ShortListeningExercise {
  return (exercise as ShortListeningExercise).type === "ShortListeningExercise";
}

export function isSpeechExercise(
  exercise: Exercise,
): exercise is SpeechExercise {
  return (exercise as SpeechExercise).type === "SpeechExercise";
}

export function isTextExercise(exercise: Exercise): exercise is TextExercise {
  return (exercise as TextExercise).type === "TextExercise";
}

export function isReadingExercise(
  exercise: Exercise,
): exercise is ReadingExercise {
  return (exercise as ReadingExercise).type === "ReadingExercise";
}

export function isRepeatAudioExercise(
  exercise: Exercise,
): exercise is RepeatAudioExercise {
  return (exercise as RepeatAudioExercise).type === "RepeatAudioExercise";
}

export function isReadAloudExercise(
  exercise: Exercise,
): exercise is ReadAloudExercise {
  return (exercise as ReadAloudExercise).type === "ReadAloudExercise";
}

export function isBuildWordExercise(
  exercise: Exercise,
): exercise is BuildWordExercise {
  return (exercise as BuildWordExercise).type === "BuildWordExercise";
}

export function isFillInTableExercise(
  exercise: Exercise,
): exercise is FillInTableExercise {
  return (exercise as FillInTableExercise).type === "FillInTableExercise";
}

export function isFillInSentenceExercise(
  exercise: Exercise,
): exercise is FillInSentenceExercise {
  return (exercise as FillInSentenceExercise).type === "FillInSentenceExercise";
}

export function isMatchingExercise(
  exercise: Exercise,
): exercise is MatchingExercise {
  return (exercise as MatchingExercise).type === "MatchingExercise";
}
