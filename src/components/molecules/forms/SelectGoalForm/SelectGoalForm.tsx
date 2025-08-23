import { useTranslation } from "i18n/client";
import icons from "styles/icons";

import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import FullWidthButton from "components/atoms/FullWidthButton/FullWidthButton";
import IconContainer from "components/atoms/IconContainer/IconContainer";
import MultipleChoiceCardList from "components/atoms/lists/MultipleChoiceCardList/MultipleChoiceCardList";

import { GoalOption, goalOptions } from "./config";

export interface ISelectGoalForm {
  onSubmit: (goal: GoalOption) => void;
}

const SelectGoalForm: React.FC<ISelectGoalForm> = ({ onSubmit }) => {
  const { t: tForm } = useTranslation("form");
  const { t: tCommon } = useTranslation("common");
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="subtitle1" mb={1}>
        {tForm("accountSetup.goalSelectTitle")}
      </Typography>

      <MultipleChoiceCardList
        choices={goalOptions.map((goal) => {
          return {
            name: tForm(`accountSetup.goalSelectOptions.${goal.id}.name`),
            description: tForm(
              `accountSetup.goalSelectOptions.${goal.id}.description`,
            ),
          };
        })}
        onChange={(i) => setSelectedIndex(i)}
        selectedIndex={selectedIndex}
      />

      <FullWidthButton
        onClick={() => {
          if (selectedIndex !== undefined) {
            onSubmit(goalOptions[selectedIndex]);
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

export default SelectGoalForm;
