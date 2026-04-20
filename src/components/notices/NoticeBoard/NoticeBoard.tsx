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

import type {
  AchievementEarnedNoticeModel,
  ChestRewardNoticeModel,
  FreeTrialEndNoticeModel,
  FreeTrialNoticeModel,
  LeagueDemotedNoticeModel,
  LeaguePromotedNoticeModel,
  StreakLostNoticeModel,
  StreakMilestoneNoticeModel,
  StreakSavedNoticeModel,
} from "infrastructure/api/generated/models";
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
      return <StreakMilestoneNotice notice={notice as StreakMilestoneNoticeModel} />;
    case NoticeType.STREAK_LOST:
      return <StreakLostNotice notice={notice as StreakLostNoticeModel} />;
    case NoticeType.STREAK_SAVED:
      return <StreakSavedNotice notice={notice as StreakSavedNoticeModel} />;
    case NoticeType.LEAGUE_PROMOTED:
      return <LeaguePromotedNotice notice={notice as LeaguePromotedNoticeModel} />;
    case NoticeType.LEAGUE_DEMOTED:
      return <LeagueDemotedNotice notice={notice as LeagueDemotedNoticeModel} />;
    case NoticeType.ACHIEVEMENT_EARNED:
      return <AchievementEarnedNotice notice={notice as AchievementEarnedNoticeModel} />;
    case NoticeType.CHEST_REWARD:
      return <ChestRewardNotice notice={notice as ChestRewardNoticeModel} />;
    case NoticeType.FREE_TRIAL:
      return <FreeTrialNotice notice={notice as FreeTrialNoticeModel} />;
    case NoticeType.FREE_TRIAL_END:
      return <FreeTrialEndNotice notice={notice as FreeTrialEndNoticeModel} />;
    case NoticeType.COURSE_COMPLETED:
      return null;
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
