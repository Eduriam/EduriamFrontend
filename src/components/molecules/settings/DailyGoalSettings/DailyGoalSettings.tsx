import { useTranslation } from "i18n/client";

import { useState } from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { goalOptions } from "components/molecules/forms/SelectGoalForm/config";

export interface IDailyGoalSettings {
  dailyGoal: number;
  onGoalChange: (value: number) => void;
}

const DailyGoalSettings: React.FC<IDailyGoalSettings> = ({
  dailyGoal,
  onGoalChange,
}) => {
  const { t } = useTranslation("form");
  const [value, setValue] = useState(dailyGoal?.toString());

  function handleChange(event: SelectChangeEvent) {
    setValue(event.target.value as string);
    onGoalChange(Number(event.target.value));
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      <Typography variant="subtitle1">{t("settings.dailyGoal")}</Typography>
      <FormControl fullWidth>
        <InputLabel id="daily-goal-label">{t("settings.dailyGoal")}</InputLabel>
        <Select
          labelId="daily-goal-label"
          id="daily-goal-select"
          value={value}
          label={t("settings.dailyGoal")}
          onChange={handleChange}
        >
          {goalOptions.map((option) => (
            <MenuItem value={option.value} key={option.value}>
              {`${t(`accountSetup.goalSelectOptions.${option.id}.name`)}: ${t(
                `accountSetup.goalSelectOptions.${option.id}.description`,
              )}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DailyGoalSettings;
