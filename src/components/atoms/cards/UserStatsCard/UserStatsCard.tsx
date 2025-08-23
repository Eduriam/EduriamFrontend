import { ResponsiveLine } from "@nivo/line";
import { BasicTooltip } from "@nivo/tooltip";
import { useTranslation } from "i18n/client";
import icons from "styles/icons";
import theme from "styles/theme";

import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import IconContainer from "components/atoms/IconContainer/IconContainer";

import { LearningDataPoint } from "infrastructure/api/users/Users";

export interface IUserStatsCard {
  streak: number;
  learningStats: Array<LearningDataPoint>;
}

const UserStatsCard: React.FC<IUserStatsCard> = ({
  streak,
  learningStats = [],
}) => {
  const { t } = useTranslation("common");
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Card>
        <CardContent>
          <Box
            sx={{
              width: "100%",
              height: desktop ? "280px" : "200px",
            }}
          >
            <ResponsiveLine
              data={[
                {
                  id: "userpoints",
                  data: learningStats.map((e) => {
                    return { x: e.date.slice(0, 10), y: e.points };
                  }),
                },
              ]}
              animate={true}
              pointSize={10}
              pointColor="white"
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              lineWidth={3}
              margin={{
                bottom: 20,
                left: 25,
                right: 10,
                top: 10,
              }}
              xFormat="time:%Y-%m-%d"
              xScale={{
                format: "%Y-%m-%d",
                precision: "day",
                type: "time",
                useUTC: false,
              }}
              axisBottom={{
                format: "%a",
                legendOffset: -12,
                tickValues: "every 1 days",
              }}
              tooltip={({ point }) => (
                <BasicTooltip id={point.data.xFormatted} value={point.data.y} />
              )}
              isInteractive
              useMesh
            ></ResponsiveLine>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ width: "50%" }}>
        <CardContent
          sx={{
            "&:last-child": {
              paddingBottom: 2,
            },
          }}
        >
          <Box display="flex" alignItems="center">
            <IconContainer
              sx={{ position: "relative", bottom: 2, mr: 1 }}
              name={icons.streak}
            />
            <Typography variant="body1" flexGrow={1}>
              {t("userProfile.streak")}
            </Typography>
            <Typography>{streak}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserStatsCard;
