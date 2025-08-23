import { useTranslation } from "i18n/client";
import theme from "styles/theme";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import FullscreenDialog from "components/atoms/FullscreenDialog/FullscreenDialog";

import { FreeTrialOfferNotice as FreeTrialOfferNoticeType } from "infrastructure/api/user/notices/Notices";
import SubscriptionAPI from "infrastructure/api/user/subscriptions/SubscriptionsAPI";
import useNotices from "infrastructure/services/NoticeProvider";

export interface IFreeTrialOfferNotice {
  notice: FreeTrialOfferNoticeType;
}

const FreeTrialOfferNotice: React.FC<IFreeTrialOfferNotice> = ({ notice }) => {
  const { t } = useTranslation("common");
  const { deleteNotice } = useNotices();
  const router = useRouter();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const imgWidth = desktop ? 275 : 200;
  const imgHeight = desktop ? 182 : 133;
  const imgBoxWidth = imgWidth + 25;

  return (
    <FullscreenDialog
      header1={t("notices.freeTrialOfferHeader")}
      primaryButton={{
        onClick: async () => {
          await SubscriptionAPI.startFreeTrial();
          deleteNotice(notice.id);
          router.push("/subscription");
        },
        text: t("notices.tryForFree"),
      }}
      secondaryButton={{
        onClick: () => deleteNotice(notice.id),
        text: t("notices.declineFreeTrialOffer"),
      }}
      transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
      maxWidth="md"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Box>
          <Image
            src={"/images/subscription/premium_1.svg"}
            alt="Premium account"
            width={400}
            height={265}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          sx={{ width: "90%", gap: 2, mt: 4 }}
        >
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={2}
          >
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("subscription.valuePropositions.0")}
            </Typography>
            <Box sx={{ width: `${imgBoxWidth}px` }}>
              <Image
                src={"/images/subscription/premium_2.svg"}
                alt="Advanced vocabulary."
                width={imgWidth}
                height={imgHeight}
              />
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
          >
            <Box sx={{ width: `${imgBoxWidth}px` }}>
              <Image
                src={"/images/subscription/premium_3.svg"}
                alt="Create your own lessons."
                width={imgWidth}
                height={imgHeight}
              />
            </Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("subscription.valuePropositions.1")}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={2}
          >
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("subscription.valuePropositions.2")}
            </Typography>
            <Box sx={{ width: `${imgBoxWidth}px` }}>
              <Image
                src={"/images/subscription/premium_4.svg"}
                alt="Advanced exercises."
                width={imgWidth}
                height={imgHeight}
              />
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
          >
            <Box sx={{ width: `${imgBoxWidth}px` }}>
              <Image
                src={"/images/subscription/premium_5.svg"}
                alt="No ads"
                width={imgWidth}
                height={imgHeight}
              />
            </Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("subscription.valuePropositions.3")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </FullscreenDialog>
  );
};

export default FreeTrialOfferNotice;
