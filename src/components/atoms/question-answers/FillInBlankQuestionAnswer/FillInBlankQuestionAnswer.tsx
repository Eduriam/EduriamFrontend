import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import WordButton from "components/atoms/WordButton/WordButton";

import {
  AnswerState,
  IQuestionAnswerComponent,
} from "infrastructure/api/user/courses/study-session/Exercises";
import { FillInBlankQuestionAnswer as FillInBlankQuestionAnswerType } from "infrastructure/api/user/courses/study-session/QuestionAnswers";
import { UserAnswer } from "infrastructure/api/user/courses/study-session/QuestionAttempt";

export interface IFillInBlankQuestionAnswer extends IQuestionAnswerComponent {
  questionAnswer: FillInBlankQuestionAnswerType;
  options: Array<string>;
}

const FillInBlankQuestionAnswer: React.FC<IFillInBlankQuestionAnswer> = ({
  onChange,
  questionAnswer,
  options: optionsProp,
  answerStates,
  displayAnswers = false,
}) => {
  const [options, setOptions] = useState<Array<string>>(optionsProp);
  const [answerArray, setAnswerArray] = useState<Array<string | undefined>>([]);
  const words = questionAnswer.answer.split(" ");

  function handleAddAnswer(index: number) {
    const newAnswerArray = [...answerArray];

    for (let i = 0; i < questionAnswer.blankIndexes.length; i++) {
      const blankIndex = questionAnswer.blankIndexes[i];
      if (!newAnswerArray[blankIndex]) {
        newAnswerArray[blankIndex] = options[index];
        break;
      }
    }

    setAnswerArray(newAnswerArray);

    const arr = [...options];
    arr.splice(index, 1);
    setOptions(arr);

    onChange?.(evaluateAnswers(newAnswerArray));
  }

  function handleRemoveAnswer(index: number) {
    if (answerArray[index] !== undefined) {
      setOptions([...options, answerArray[index] ?? ""]);
    }

    const newAnswerArray = [...answerArray];
    newAnswerArray[index] = undefined;
    setAnswerArray(newAnswerArray);

    onChange?.(evaluateAnswers(newAnswerArray));
  }

  function evaluateAnswers(answerArray: Array<string | undefined>): UserAnswer {
    const words = questionAnswer.answer.split(" ");
    const answers: Array<string> = [];
    const states: Array<AnswerState> = [];

    questionAnswer.blankIndexes.forEach((i) => {
      answers.push(answerArray[i] ?? "");

      if (answerArray[i] === words[i]) {
        states.push("RIGHT");
      } else if (!answerArray[i]) {
        states.push("NONE");
      } else {
        states.push("WRONG");
      }
    });

    return {
      answers,
      states,
      exerciseId: questionAnswer.id,
      lessonItemId: questionAnswer.lessonItemId,
    };
  }

  function canAddMoreAnswers() {
    let answerCounter = 0;
    answerArray.forEach((answer) => {
      if (answer) answerCounter++;
    });

    return answerCounter < questionAnswer.blankIndexes.length;
  }

  function getAnswerState(wordIndex: number) {
    let answerStateIndex = 0;

    for (let i = 0; i < questionAnswer.blankIndexes.length; i++) {
      if (questionAnswer.blankIndexes[i] === wordIndex) {
        break;
      } else {
        answerStateIndex++;
      }
    }

    return answerStates?.[answerStateIndex] ?? "NONE";
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box>
        <Typography variant="subtitle1">{questionAnswer.question}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          whiteSpace: "pre-wrap",
        }}
      >
        {words.map((word, i) => {
          if (questionAnswer.blankIndexes?.includes(i)) {
            if (answerArray[i]) {
              return (
                <Box key={i}>
                  <WordButton
                    word={answerArray[i]}
                    onClick={() => handleRemoveAnswer(i)}
                    key={`options-${i}`}
                    disabled={displayAnswers}
                    state={getAnswerState(i)}
                  />

                  <Typography
                    variant="body1"
                    paragraph={false}
                    display="inline"
                  >
                    {" "}
                  </Typography>
                </Box>
              );
            } else {
              return (
                <Box key={i}>
                  <WordButton key={`options-${i}`} empty />
                  <Typography
                    variant="body1"
                    paragraph={false}
                    display="inline"
                  >
                    {" "}
                  </Typography>
                </Box>
              );
            }
          } else {
            return (
              <Box key={i}>
                <Typography variant="body1" paragraph={false} display="inline">
                  {word}
                </Typography>

                <Typography variant="body1" paragraph={false} display="inline">
                  {" "}
                </Typography>
              </Box>
            );
          }
        })}
      </Box>
      <Box sx={{ mb: 8, mt: 4 }} display="flex" gap={1}>
        {options.map((option, i) => {
          return (
            <WordButton
              word={option}
              onClick={() => handleAddAnswer(i)}
              key={`options-${i}`}
              disabled={displayAnswers || !canAddMoreAnswers()}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default FillInBlankQuestionAnswer;
