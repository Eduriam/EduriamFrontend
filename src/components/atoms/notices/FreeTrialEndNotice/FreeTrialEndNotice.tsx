import { useTranslation } from "i18n/client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Box, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import FullscreenDialog from "components/atoms/FullscreenDialog/FullscreenDialog";

import { FreeTrialEndNotice as FreeTrialEndNoticeType } from "infrastructure/api/user/notices/Notices";
import useNotices from "infrastructure/services/NoticeProvider";

import { featureIdList } from "./config";

export interface IFreeTrialEndNotice {
  notice: FreeTrialEndNoticeType;
}

const FreeTrialEndNotice: React.FC<IFreeTrialEndNotice> = ({ notice }) => {
  const { deleteNotice } = useNotices();
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <FullscreenDialog
      primaryButton={{
        onClick: () => {
          deleteNotice(notice.id);
          router.push("/subscription");
        },
        text: t("notices.extendSubscription"),
      }}
      secondaryButton={{
        onClick: () => deleteNotice(notice.id),
        text: t("notices.continueWithFreeAccount"),
      }}
      transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ width: "100%", gap: 4 }}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {t("notices.freeTrialEnded")}
        </Typography>

        <Box>
          <Image
            src={"/images/subscription/premium_1.svg"}
            alt="Premium account"
            width={400}
            height={265}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ textAlign: "center", mt: 2 }}>
            {t("freeTrialEndNotice.title")}
          </Typography>

          <List sx={{ listStyleType: "disc", pl: 4 }}>
            {featureIdList.map((featureId, i) => (
              <ListItem sx={{ display: "list-item" }} key={i}>
                {t(`freeTrialEndNotice.${featureId}`)}
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </FullscreenDialog>
  );
};

export default FreeTrialEndNotice;
