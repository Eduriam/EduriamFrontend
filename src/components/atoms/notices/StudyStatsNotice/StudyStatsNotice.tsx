import { ResponsivePie } from "@nivo/pie";
import { useTranslation } from "i18n/client";
import theme from "styles/theme";

import Box from "@mui/material/Box";

import FullscreenDialog from "components/atoms/FullscreenDialog/FullscreenDialog";

import { StudyStatsNotice as StudyStatsNoticeType } from "infrastructure/api/user/notices/Notices";
import useNotices from "infrastructure/services/NoticeProvider";

export interface IStudyStatsNotice {
  notice: StudyStatsNoticeType;
}

const StudyStatsNotice: React.FC<IStudyStatsNotice> = ({ notice }) => {
  const { popNotice } = useNotices();
  const { t } = useTranslation("common");

  return (
    <FullscreenDialog
      header2={t("notices.studySessionEnded")}
      primaryButton={{
        onClick: () => popNotice(),
        text: t("userActions.continue"),
      }}
      transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
    >
      <Box sx={{ width: "100%", height: "200px", mt: 4 }}>
        <ResponsivePie
          margin={{
            top: 15,
            bottom: 15,
          }}
          data={[
            {
              id: t("notices.rightAnswers"),
              value: Math.round(
                (notice.stats.rightAnswers /
                  (notice.stats.rightAnswers + notice.stats.wrongAnswers)) *
                  100,
              ),
            },
            {
              id: t("notices.wrongAnswers"),
              value: Math.round(
                (notice.stats.wrongAnswers /
                  (notice.stats.rightAnswers + notice.stats.wrongAnswers)) *
                  100,
              ),
            },
          ]}
          isInteractive={true}
          arcLabel={(d) => `${d.value}%`}
          animate={true}
          innerRadius={0.7}
          padAngle={2}
          cornerRadius={20}
          enableArcLabels={true}
          enableArcLinkLabels={true}
          arcLinkLabelsDiagonalLength={8}
          arcLinkLabelsStraightLength={12}
          colors={[theme.palette.success.light, theme.palette.error.light]}
        />
      </Box>
    </FullscreenDialog>
  );
};

export default StudyStatsNotice;
