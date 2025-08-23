import { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import {
  AnswerState,
  IQuestionAnswerComponent,
} from "infrastructure/api/user/courses/study-session/Exercises";
import { MatchingQuestionAnswer as MatchingQuestionAnswerType } from "infrastructure/api/user/courses/study-session/QuestionAnswers";
import {
  isMatchAudioOption,
  isMatchImageOption,
  isMatchTextOption,
} from "infrastructure/api/user/courses/study-session/guards/matchingOptionsGuard";

import MatchAudioOption from "../matching-options/MatchAudioOption/MatchAudioOption";
import MatchImageOption from "../matching-options/MatchImageOption/MatchImageOption";
import MatchTextOption from "../matching-options/MatchTextOption/MatchTextOption";

export interface IMatchingQuestionAnswer extends IQuestionAnswerComponent {
  questionAnswer: MatchingQuestionAnswerType;
}

const MatchingQuestionAnswer: React.FC<IMatchingQuestionAnswer> = ({
  onChange,
  questionAnswer,
}) => {
  const [selectedIndex1, setSelectedIndex1] = useState<number | undefined>();
  const [selectedIndex2, setSelectedIndex2] = useState<number | undefined>();
  const [optionStates1, setOptionStates1] = useState<Array<AnswerState>>(
    questionAnswer.options1.map(() => "NONE"),
  );

  const [optionStates2, setOptionStates2] = useState<Array<AnswerState>>(
    questionAnswer.options2.map(() => "NONE"),
  );

  const [answerStates, setAnswerStates] = useState<Array<AnswerState>>(
    questionAnswer.options1.map(() => "NONE"),
  );

  useEffect(() => {
    // Reset wrong states to none
    if (selectedIndex1 !== undefined || selectedIndex2 !== undefined) {
      setOptionStates1((prevArray) => {
        return prevArray.map((state) => (state === "WRONG" ? "NONE" : state));
      });

      setOptionStates2((prevArray) => {
        return prevArray.map((state) => (state === "WRONG" ? "NONE" : state));
      });
    }

    if (selectedIndex1 !== undefined && selectedIndex2 !== undefined) {
      let state: AnswerState = "NONE";
      if (
        questionAnswer.options1[selectedIndex1].matchIndex === selectedIndex2
      ) {
        state = "RIGHT";
      } else {
        state = "WRONG";
      }

      setOptionStates1((prevArray) => {
        const arr = [...prevArray];
        arr[selectedIndex1] = state;
        return arr;
      });

      setOptionStates2((prevArray) => {
        const arr = [...prevArray];
        arr[selectedIndex2] = state;
        return arr;
      });
      setSelectedIndex1(undefined);
      setSelectedIndex2(undefined);

      setAnswerStates((prevArray) => {
        const arr = [...prevArray];
        arr[selectedIndex1] =
          arr[selectedIndex1] === "NONE" ? state : arr[selectedIndex1];
        return arr;
      });
    }

    let shouldReportChange = true;
    optionStates1.forEach((state) => {
      if (state !== "RIGHT") shouldReportChange = false;
    });
    if (shouldReportChange) {
      onChange?.({
        answers: questionAnswer.options1.map((option) => {
          if (isMatchTextOption(option)) {
            return option.text;
          } else if (isMatchAudioOption(option)) {
            return option.audioUrl;
          } else if (isMatchImageOption(option)) {
            return option.imageUrl;
          } else return "";
        }),
        exerciseId: questionAnswer.id,
        states: answerStates,
        lessonItemId: questionAnswer.lessonItemId,
      });
    }
  }, [
    selectedIndex1,
    selectedIndex2,
    setOptionStates1,
    setOptionStates2,
    setSelectedIndex1,
    setSelectedIndex2,
    answerStates,
    onChange,
    questionAnswer.id,
    questionAnswer.options1,
    questionAnswer.lessonItemId,
    optionStates1,
  ]);

  function horizontalLayout() {
    if (
      questionAnswer.options1.some((option) => isMatchImageOption(option)) ||
      questionAnswer.options2.some((option) => isMatchImageOption(option))
    )
      return true;
    else return false;
  }

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      gap={horizontalLayout() ? 8 : 2}
      sx={{ my: 2 }}
      flexDirection={horizontalLayout() ? "column" : "row"}
    >
      <Box
        display="flex"
        flexDirection={horizontalLayout() ? "row" : "column"}
        flexWrap="wrap"
        gap={2}
        justifyContent={horizontalLayout() ? "center" : undefined}
      >
        {questionAnswer.options1.map((option, i) => {
          let selected = false;
          if (selectedIndex1 === i) {
            selected = true;
          }

          if (isMatchTextOption(option)) {
            return (
              <MatchTextOption
                text={option.text}
                selected={selected}
                onClick={() => setSelectedIndex1(i)}
                disabled={optionStates1[i] === "RIGHT"}
                animateWrong={optionStates1[i] === "WRONG"}
                key={`options1-${i}`}
              />
            );
          } else if (isMatchAudioOption(option)) {
            return (
              <MatchAudioOption
                audioUrl={option.audioUrl}
                selected={selected}
                onClick={() => setSelectedIndex1(i)}
                disabled={optionStates1[i] === "RIGHT"}
                animateWrong={optionStates1[i] === "WRONG"}
                key={`options1-${i}`}
              />
            );
          } else if (isMatchImageOption(option)) {
            return (
              <Box
                flexBasis={horizontalLayout() ? "40%" : undefined}
                key={`options1-${i}`}
              >
                <MatchImageOption
                  imageUrl={option.imageUrl}
                  selected={selected}
                  onClick={() => setSelectedIndex1(i)}
                  disabled={optionStates1[i] === "RIGHT"}
                  animateWrong={optionStates1[i] === "WRONG"}
                />
              </Box>
            );
          }
        })}
      </Box>
      <Box
        display="flex"
        flexDirection={horizontalLayout() ? "row" : "column"}
        flexWrap="wrap"
        gap={2}
        justifyContent={horizontalLayout() ? "center" : undefined}
      >
        {questionAnswer.options2.map((option, i) => {
          let selected = false;
          if (selectedIndex2 === i) {
            selected = true;
          }

          if (isMatchTextOption(option)) {
            return (
              <MatchTextOption
                text={option.text}
                selected={selected}
                onClick={() => setSelectedIndex2(i)}
                disabled={optionStates2[i] === "RIGHT"}
                animateWrong={optionStates2[i] === "WRONG"}
                key={`options2-${i}`}
              />
            );
          } else if (isMatchAudioOption(option)) {
            return (
              <MatchAudioOption
                audioUrl={option.audioUrl}
                selected={selected}
                onClick={() => setSelectedIndex2(i)}
                disabled={optionStates2[i] === "RIGHT"}
                animateWrong={optionStates2[i] === "WRONG"}
                key={`options2-${i}`}
              />
            );
          } else if (isMatchImageOption(option)) {
            return (
              <Box
                flexBasis={horizontalLayout() ? "40%" : undefined}
                key={`options2-${i}`}
              >
                <MatchImageOption
                  imageUrl={option.imageUrl}
                  selected={selected}
                  onClick={() => setSelectedIndex2(i)}
                  disabled={optionStates2[i] === "RIGHT"}
                  animateWrong={optionStates2[i] === "WRONG"}
                />
              </Box>
            );
          }
        })}
      </Box>
    </Box>
  );
};

export default MatchingQuestionAnswer;
