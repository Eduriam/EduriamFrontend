import { MutableRefObject, useState } from "react";

import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { TextQuestionAnswer as TextQuestionAnswerType } from "infrastructure/api/user/courses/study-session/QuestionAnswers";

import { IQuestionAnswerComponent } from "../../../../infrastructure/api/user/courses/study-session/Exercises";
import { UserAnswer } from "../../../../infrastructure/api/user/courses/study-session/QuestionAttempt";
import useAuth from "../../../../infrastructure/services/AuthProvider";
import AudioInputIconButton from "../../AudioInputIconButton/AudioInputIconButton";
import CharacterButton from "../../CharacterButton/CharacterButton";

export interface ITextQuestionAnswer extends IQuestionAnswerComponent {
  inputRef?: MutableRefObject<HTMLElement | null>;
  rows?: "short" | "long";
  size?: "small" | "medium";
  enableAudioInput?: boolean;
  characterButtons?: Array<string>;
  questionAnswer: TextQuestionAnswerType;
}

const TextQuestionAnswer: React.FC<ITextQuestionAnswer> = ({
  inputRef,
  rows = "short",
  size = "medium",
  enableAudioInput = false,
  onChange,
  questionAnswer,
  answerStates,
  displayAnswers = false,
  characterButtons = [],
}) => {
  const { user } = useAuth();
  const [value, setValue] = useState<string>();

  const handleChange = (text: string) => {
    setValue(text.toLowerCase());
    onChange?.(
      evaluateAnswer({
        answers: [text.toLowerCase()],
        exerciseId: questionAnswer.id,
        states: ["NONE"],
        lessonItemId: questionAnswer.lessonItemId,
      }),
    );
  };

  const evaluateAnswer = (userAnswer: UserAnswer): UserAnswer => {
    const obj = userAnswer;
    if (userAnswer.answers[0] === questionAnswer.answer) {
      obj.states[0] = "RIGHT";
    } else if (userAnswer.answers[0] === "") {
      obj.states[0] = "NONE";
    } else {
      obj.states[0] = "WRONG";
    }
    return { ...obj };
  };

  return (
    <Box>
      <Box>
        <Typography variant="subtitle2">{questionAnswer.question}</Typography>
      </Box>
      <TextField
        inputRef={inputRef}
        variant="outlined"
        size={size}
        value={value}
        multiline={rows === "long" ? true : false}
        rows={rows === "long" ? 3 : 1}
        fullWidth
        sx={{
          borderRadius: 2,
          "& .MuiInputBase-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
            {
              borderColor:
                displayAnswers && answerStates?.[0] === "RIGHT"
                  ? "success.main"
                  : displayAnswers && answerStates?.[0] === "WRONG"
                    ? "error.main"
                    : undefined,
              borderWidth: 2,
            },
        }}
        autoComplete="off"
        disabled={displayAnswers ? true : false}
        color={
          displayAnswers && answerStates?.[0] === "RIGHT"
            ? "success"
            : displayAnswers && answerStates?.[0] === "WRONG"
              ? "error"
              : undefined
        }
        focused={
          displayAnswers &&
          (answerStates?.[0] === "RIGHT" || answerStates?.[0] === "WRONG")
            ? true
            : false
        }
        onChange={(e) => handleChange(e.target.value)}
        InputProps={{
          endAdornment:
            enableAudioInput && user ? (
              <InputAdornment
                position="end"
                sx={{
                  alignItems: rows === "long" ? "flex-start" : undefined,
                }}
              >
                <AudioInputIconButton
                  onChange={(text) => handleChange(text)}
                  inputLanguage={user.selectedCourse.language2}
                  disabled={displayAnswers ? true : false}
                />
              </InputAdornment>
            ) : undefined,
        }}
      />
      <Box sx={{ mt: 1 }}>
        {characterButtons.map((character, i) => {
          return (
            <CharacterButton
              character={character}
              onClick={() => handleChange(`${value ?? ""}${character}`)}
              key={i}
              disabled={displayAnswers}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default TextQuestionAnswer;
