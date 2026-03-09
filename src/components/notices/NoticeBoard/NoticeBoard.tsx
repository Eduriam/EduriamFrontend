import { useEffect, useMemo, useRef } from "react";

import AchievementEarnedNotice from "components/notices/AchievementEarnedNotice/AchievementEarnedNotice";
import AdvertisementNotice from "components/notices/AdvertisementNotice/AdvertisementNotice";
import ChestRewardNotice from "components/notices/ChestRewardNotice/ChestRewardNotice";
import LeagueDemotedNotice from "components/notices/LeagueDemotedNotice/LeagueDemotedNotice";
import LeaguePromotedNotice from "components/notices/LeaguePromotedNotice/LeaguePromotedNotice";
import NotificationsDisabledNotice from "components/notices/NotificationsDisabledNotice/NotificationsDisabledNotice";
import StreakLostNotice from "components/notices/StreakLostNotice/StreakLostNotice";
import StreakMilestoneNotice from "components/notices/StreakMilestoneNotice/StreakMilestoneNotice";
import StreakSavedNotice from "components/notices/StreakSavedNotice/StreakSavedNotice";

import type { Notice, NoticeType } from "infrastructure/api/users/me/notices/Notices";
import useNotices from "infrastructure/services/NoticeProvider";

export interface NoticeBoardProps {
  allowedNoticeTypes?: NoticeType[];
}

function renderNotice(notice: Notice) {
  switch (notice.type) {
    case "NOTIFICATIONS_DISABLED":
      return <NotificationsDisabledNotice notice={notice} />;
    case "STREAK_MILESTONE":
      return <StreakMilestoneNotice notice={notice} />;
    case "STREAK_LOST":
      return <StreakLostNotice notice={notice} />;
    case "STREAK_SAVED":
      return <StreakSavedNotice notice={notice} />;
    case "LEAGUE_PROMOTED":
      return <LeaguePromotedNotice notice={notice} />;
    case "LEAGUE_DEMOTED":
      return <LeagueDemotedNotice notice={notice} />;
    case "ACHIEVEMENT_EARNED":
      return <AchievementEarnedNotice notice={notice} />;
    case "CHEST_REWARD":
      return <ChestRewardNotice notice={notice} />;
    case "ADVERTISEMENT":
      return <AdvertisementNotice notice={notice} />;
    default:
      return null;
  }
}

const NoticeBoard: React.FC<NoticeBoardProps> = ({ allowedNoticeTypes }) => {
  const fetchedRef = useRef(false);
  const { notices, fetchNotices } = useNotices();

  useEffect(() => {
    if (fetchedRef.current) {
      return;
    }

    fetchedRef.current = true;
    void fetchNotices();
  }, [fetchNotices]);

  const currentNotice = useMemo(() => {
    if (!allowedNoticeTypes || allowedNoticeTypes.length === 0) {
      return notices[0];
    }

    return notices.find((notice) => allowedNoticeTypes.includes(notice.type));
  }, [allowedNoticeTypes, notices]);

  if (!currentNotice) {
    return null;
  }

  return <>{renderNotice(currentNotice)}</>;
};

export default NoticeBoard;
