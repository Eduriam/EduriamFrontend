import { useTranslation } from "i18n/client";
import icons from "styles/icons";

import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import FullWidthButton from "components/atoms/FullWidthButton/FullWidthButton";
import IconContainer from "components/atoms/IconContainer/IconContainer";
import MultipleChoiceCardList from "components/atoms/lists/MultipleChoiceCardList/MultipleChoiceCardList";

import { SurveyAnswer } from "infrastructure/api/user/survey-answers/SurveyAnswers";

import { initialSurveyId, surveyOptions } from "./config";

export interface IInitialSurveyForm {
  onSubmit: (answer: Omit<SurveyAnswer, "userId">) => void;
}

const InitialSurveyForm: React.FC<IInitialSurveyForm> = ({ onSubmit }) => {
  const { t: tForm } = useTranslation("form");
  const { t: tCommon } = useTranslation("common");
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="subtitle1" mb={1}>
        {tForm("accountSetup.initialSurveyQuestion")}
      </Typography>

      <MultipleChoiceCardList
        choices={surveyOptions.map((option) => {
          return {
            name: tForm(`accountSetup.initialSurveyOptions.${option.id}`),
          };
        })}
        onChange={(i) => setSelectedIndex(i)}
        selectedIndex={selectedIndex}
      />

      <FullWidthButton
        onClick={() => {
          if (selectedIndex !== undefined) {
            onSubmit({
              answer: surveyOptions[selectedIndex].id,
              surveyId: initialSurveyId,
            });
          }
        }}
        disabled={selectedIndex === undefined}
      >
        {tCommon("navigation.continue")}
        <IconContainer name={icons.next} />
      </FullWidthButton>
    </Box>
  );
};

export default InitialSurveyForm;
