import {
  MatchAudioOption,
  MatchImageOption,
  MatchOption,
  MatchTextOption,
} from "../QuestionAnswers";

export function isMatchTextOption(
  option: MatchOption,
): option is MatchTextOption {
  return (option as MatchTextOption).text !== undefined;
}

export function isMatchAudioOption(
  option: MatchOption,
): option is MatchAudioOption {
  return (option as MatchAudioOption).audioUrl !== undefined;
}

export function isMatchImageOption(
  option: MatchOption,
): option is MatchImageOption {
  return (option as MatchImageOption).imageUrl !== undefined;
}
