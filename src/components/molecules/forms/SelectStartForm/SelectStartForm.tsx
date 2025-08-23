import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SimpleCardWide from "components/atoms/cards/SimpleCardWide/SimpleCardWide";

import { StartOptionId, startOptions } from "./config";

export interface ISelectStartForm {
  onSubmit: (optionId: StartOptionId) => void;
}

const SelectStartForm: React.FC<ISelectStartForm> = ({ onSubmit }) => {
  const { t: tForm } = useTranslation("form");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="subtitle1">
        {tForm("accountSetup.startOptionsTitle")}
      </Typography>

      {startOptions.map((option) => (
        <SimpleCardWide
          key={option.id}
          header={tForm(`accountSetup.startOptions.${option.id}.name`)}
          subheader={tForm(
            `accountSetup.startOptions.${option.id}.description`,
          )}
          imageUrl={option.imageUrl}
          imgSize={120}
          onClick={() => onSubmit(option.id)}
        />
      ))}
    </Box>
  );
};

export default SelectStartForm;
