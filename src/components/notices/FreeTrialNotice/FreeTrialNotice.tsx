import { BasicNavbar } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import NoticeDialog from "components/notices/NoticeDialog/NoticeDialog";
import PremiumBenefits from "components/premium/PremiumBenefits/PremiumBenefits";
import { getPremiumBackgroundGradient } from "components/premium/premiumBackground";

import type { FreeTrialNoticeModel } from "infrastructure/api/generated/models";
import useNotices from "infrastructure/services/NoticeProvider";

export interface FreeTrialNoticeProps {
  notice: FreeTrialNoticeModel;
}

const FreeTrialNotice: React.FC<FreeTrialNoticeProps> = ({ notice }) => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
  const { markNoticeAsRead } = useNotices();
  const theme = useTheme();

  const navigateToFreeTrial = navigateWithTransition("/free-trial");

  const handleStartFreeTrial = async () => {
    await markNoticeAsRead(notice.id);
    navigateToFreeTrial();
  };

  const handleClose = async () => {
    await markNoticeAsRead(notice.id);
  };

  return (
    <NoticeDialog
      data-test="free-trial-notice"
      backgroundImage={getPremiumBackgroundGradient(theme.palette.mode)}
      paddingTop="none"
      navbar={
        <BasicNavbar
          background="transparent"
          leftButton={{
            icon: "close",
            onClick: () => {
              void handleClose();
            },
            dataTest: "close-free-trial-notice-button",
          }}
        />
      }
      primaryButton={{
        onClick: () => {
          void handleStartFreeTrial();
        },
        text: t("freeTrial.startButton"),
        dataTest: "start-free-trial-button",
      }}
      secondaryButton={{
        onClick: () => {
          void markNoticeAsRead(notice.id);
        },
        text: t("userActions.continue"),
        dataTest: "continue-button",
      }}
      transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
    >
      <Stack spacing={6}>
        <Typography
          variant="h4"
          align="center"
          data-test="free-trial-notice-section"
        >
          {t("premium.header")}
        </Typography>

        <PremiumBenefits dataTest="premium-benefits-section" />
      </Stack>
    </NoticeDialog>
  );
};

export default FreeTrialNotice;
