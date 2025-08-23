import { useTranslation } from "i18n/client";

import FullscreenDialog from "components/atoms/FullscreenDialog/FullscreenDialog";

import { AchievementNotice as AchievementNoticeType } from "infrastructure/api/user/notices/Notices";
import useNotices from "infrastructure/services/NoticeProvider";

export interface IAchievementNotice {
  notice: AchievementNoticeType;
}

const AchievementNotice: React.FC<IAchievementNotice> = ({ notice }) => {
  const { popNotice } = useNotices();
  const { t } = useTranslation("common");

  return (
    <FullscreenDialog
      header1={t("notices.achievementGet")}
      imageUrl={notice.imageUrl}
      header2={notice.name}
      text={notice.description}
      primaryButton={{
        onClick: () => popNotice(),
        text: t("userActions.continue"),
      }}
      transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
    />
  );
};

export default AchievementNotice;
