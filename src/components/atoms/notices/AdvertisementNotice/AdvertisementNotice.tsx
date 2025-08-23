import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";

import FullscreenDialog from "components/atoms/FullscreenDialog/FullscreenDialog";

import useNotices from "infrastructure/services/NoticeProvider";

export interface IAdvertisementNotice {}

const AdvertisementNotice: React.FC<IAdvertisementNotice> = () => {
  const { popNotice } = useNotices();
  const { t } = useTranslation("common");

  return (
    <FullscreenDialog
      text={t("notices.advertisementNote")}
      primaryButton={{
        onClick: () => popNotice(),
        text: t("userActions.continue"),
      }}
      transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{ width: "300px", height: "300px", backgroundColor: "gray" }}
        />
      </Box>
    </FullscreenDialog>
  );
};

export default AdvertisementNotice;
