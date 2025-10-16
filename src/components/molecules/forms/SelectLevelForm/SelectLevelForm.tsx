import { FullWidthButton, Icon } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import icons from "styles/icons";

import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import MultipleChoiceCardList from "components/atoms/lists/MultipleChoiceCardList/MultipleChoiceCardList";

import { LevelOption, levelOptions } from "./config";

export interface ISelectLevelForm {
  onSubmit: (answer: LevelOption) => void;
}

const SelectLevelForm: React.FC<ISelectLevelForm> = ({ onSubmit }) => {
  const { t: tForm } = useTranslation("form");
  const { t: tCommon } = useTranslation("common");
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="subtitle1" mb={1}>
        {tForm("accountSetup.levelOptionsTitle")}
      </Typography>

      <MultipleChoiceCardList
        choices={levelOptions.map((option, i) => {
          return {
            name: tForm(`accountSetup.levelOptions.${option.id}.name`),
            description:
              selectedIndex === i
                ? tForm(`accountSetup.levelOptions.${option.id}.description`)
                : undefined,
          };
        })}
        onChange={(i) => setSelectedIndex(i)}
        selectedIndex={selectedIndex}
      />

      <FullWidthButton
        onClick={() => {
          if (selectedIndex !== undefined) {
            onSubmit(levelOptions[selectedIndex]);
          }
        }}
        disabled={selectedIndex === undefined}
      >
        {tCommon("navigation.continue")}
        <Icon name={icons.next} />
      </FullWidthButton>
    </Box>
  );
};

export default SelectLevelForm;
