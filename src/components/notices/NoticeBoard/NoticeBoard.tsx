import { useEffect, useMemo, useRef } from "react";

import AchievementEarnedNotice from "components/notices/AchievementEarnedNotice/AchievementEarnedNotice";
import ChestRewardNotice from "components/notices/ChestRewardNotice/ChestRewardNotice";
import FreeTrialEndNotice from "components/notices/FreeTrialEndNotice/FreeTrialEndNotice";
import FreeTrialNotice from "components/notices/FreeTrialNotice/FreeTrialNotice";
import LeagueDemotedNotice from "components/notices/LeagueDemotedNotice/LeagueDemotedNotice";
import LeaguePromotedNotice from "components/notices/LeaguePromotedNotice/LeaguePromotedNotice";
import StreakLostNotice from "components/notices/StreakLostNotice/StreakLostNotice";
import StreakMilestoneNotice from "components/notices/StreakMilestoneNotice/StreakMilestoneNotice";
import StreakSavedNotice from "components/notices/StreakSavedNotice/StreakSavedNotice";

import {
  NoticeType,
  type Notice,
} from "infrastructure/api/users/me/notices/NoticeService";
import useNotices from "infrastructure/services/NoticeProvider";

export interface NoticeBoardProps {
  allowedNoticeTypes?: NoticeType[];
}

function renderNotice(notice: Notice) {
  switch (notice.type) {
    case NoticeType.STREAK_MILESTONE:
      return <StreakMilestoneNotice notice={notice} />;
    case NoticeType.STREAK_LOST:
      return <StreakLostNotice notice={notice} />;
    case NoticeType.STREAK_SAVED:
      return <StreakSavedNotice notice={notice} />;
    case NoticeType.LEAGUE_PROMOTED:
      return <LeaguePromotedNotice notice={notice} />;
    case NoticeType.LEAGUE_DEMOTED:
      return <LeagueDemotedNotice notice={notice} />;
    case NoticeType.ACHIEVEMENT_EARNED:
      return <AchievementEarnedNotice notice={notice} />;
    case NoticeType.CHEST_REWARD:
      return <ChestRewardNotice notice={notice} />;
    case NoticeType.FREE_TRIAL:
      return <FreeTrialNotice notice={notice} />;
    case NoticeType.FREE_TRIAL_END:
      return <FreeTrialEndNotice notice={notice} />;
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
