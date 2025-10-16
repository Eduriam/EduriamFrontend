import { Emoji } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Image from "next/image";

import { Box, Typography } from "@mui/material";

import FullscreenDialog from "components/atoms/FullscreenDialog/FullscreenDialog";

import { RewardNotice as RewardNoticeType } from "infrastructure/api/user/notices/Notices";
import useNotices from "infrastructure/services/NoticeProvider";

export interface IRewardNotice {
  notice: RewardNoticeType;
}

const RewardNotice: React.FC<IRewardNotice> = ({ notice }) => {
  const { popNotice } = useNotices();
  const { t } = useTranslation("common");

  return (
    <FullscreenDialog
      primaryButton={{
        onClick: () => popNotice(),
        text: t("userActions.continue"),
      }}
      transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box sx={{ pb: 2 }}>
          <Image
            src={"/images/reward.svg"}
            alt="404"
            width={400}
            height={265}
          />
        </Box>

        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {t("notices.rewardGet")}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {`${notice.reward}`}
          </Typography>
          <Emoji emoji="🪙" />
        </Box>
      </Box>
    </FullscreenDialog>
  );
};

export default RewardNotice;
