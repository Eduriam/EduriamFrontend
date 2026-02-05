"use client";

import { Card, Illustration } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface IDayStreakCard {
  streak: number;
}

const DayStreakCard: React.FC<IDayStreakCard> = ({ streak }) => {
  const { t } = useTranslation("common");

  return (
    <Card paddingX="medium" paddingY="small">
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Illustration name="fire" width={32} height={32} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <Typography variant="body2" fontWeight="bold">
            {streak}
          </Typography>
          <Typography variant="body2">{t("userProfile.streak")}</Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default DayStreakCard;
