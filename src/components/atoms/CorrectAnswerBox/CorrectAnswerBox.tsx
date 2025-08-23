import { useTranslation } from "next-i18next";

import Typography from "@mui/material/Typography";

import { AnswerState } from "../../../infrastructure/api/user/courses/study-session/Exercises";

export interface ICorrectAnswerBox {
  state?: AnswerState;
  answer: string;
  correctAnswer: string;
}

const CorrectAnswerBox: React.FC<ICorrectAnswerBox> = ({
  state,
  answer,
  correctAnswer,
}) => {
  const { t } = useTranslation("common");

  return (
    <>
      {!state || state === "NONE" ? (
        <></>
      ) : (
        <>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              color:
                state === "RIGHT"
                  ? "green"
                  : state === "WRONG"
                    ? `red`
                    : undefined,
            }}
          >
            {state === "RIGHT"
              ? t("exercise.right")
              : state === "WRONG"
                ? t("exercise.wrong")
                : ""}
          </Typography>
          {correctAnswer !== answer && (
            <>
              <Typography variant="subtitle2">
                {state === "RIGHT"
                  ? t("exercise.alternativeAnswer")
                  : state === "WRONG"
                    ? t("exercise.correctAnswer")
                    : ""}
              </Typography>
              <Typography variant="body2">{correctAnswer}</Typography>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CorrectAnswerBox;
