import { useTranslation } from "i18n/client";

import { useState } from "react";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import FullscreenDialog from "components/atoms/FullscreenDialog/FullscreenDialog";

import { RatingSurveyNotice as RatingSurveyNoticeType } from "infrastructure/api/user/notices/Notices";
import SurveyAnswersAPI from "infrastructure/api/user/survey-answers/SurveyAnswersAPI";
import useNotices from "infrastructure/services/NoticeProvider";

export interface IRatingSurveyNotice {
  notice: RatingSurveyNoticeType;
}

const RatingSurveyNotice: React.FC<IRatingSurveyNotice> = ({ notice }) => {
  const { t } = useTranslation("common");
  const [rating, setRating] = useState<number>(0);
  const { deleteNotice } = useNotices();

  return (
    <FullscreenDialog
      header2={notice.question}
      primaryButton={{
        onClick: () => {
          SurveyAnswersAPI.createSurveyAnswer({
            answer: rating,
            surveyId: notice.surveyId,
          });
          deleteNotice(notice.id);
        },
        text: t("userActions.continue"),
      }}
      transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
    >
      <Box alignSelf="center">
        <Box
          display="flex"
          justifyContent="space-between"
          gap={2}
          alignItems="center"
        >
          <Typography>{notice.answerLabel1}</Typography>
          <Rating
            size="large"
            value={rating}
            onChange={(_, newValue) => {
              if (newValue) setRating(newValue);
            }}
            max={notice.maxPoints}
          />
          <Typography>{notice.answerLabel2}</Typography>
        </Box>
      </Box>
    </FullscreenDialog>
  );
};

export default RatingSurveyNotice;
