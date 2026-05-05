import type { Id } from "domain/models/types/core";

import {
  type AchievementEarnedNoticeModel,
  type ChestRewardNoticeModel,
  type CourseCompletedNoticeModel,
  type FreeTrialEndNoticeModel,
  type FreeTrialNoticeModel,
  type GetApiUsersMeNoticesParams,
  type LeagueDemotedNoticeModel,
  type LeaguePromotedNoticeModel,
  NoticeType,
  type StreakLostNoticeModel,
  type StreakMilestoneNoticeModel,
  type StreakSavedNoticeModel,
} from "infrastructure/api/generated/models";
import { getUsers } from "infrastructure/api/generated/users/users";
import { invalidateCurrentUser } from "infrastructure/services/users/currentUserState";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

type BaseNotice =
  | StreakMilestoneNoticeModel
  | StreakLostNoticeModel
  | StreakSavedNoticeModel
  | LeaguePromotedNoticeModel
  | LeagueDemotedNoticeModel
  | AchievementEarnedNoticeModel
  | ChestRewardNoticeModel
  | FreeTrialEndNoticeModel
  | CourseCompletedNoticeModel
  | FreeTrialNoticeModel;

export type Notice = BaseNotice;
export type NoticeOfType<T extends NoticeType> = Extract<Notice, { type: T }>;

const NoticeService = {
  async getNotices(
    params: GetApiUsersMeNoticesParams = {},
  ): Promise<Array<Notice>> {
    try {
      const response = await usersClient.getApiUsersMeNotices(params);
      return (response.data?.items ?? []) as Array<Notice>;
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async deleteNotice(noticeId: Id): Promise<void> {
    try {
      await usersClient.deleteApiUsersMeNoticesNoticeId(noticeId);
      await invalidateCurrentUser();
    } catch (error) {
      return toErrorCode(error);
    }
  },
};

export { NoticeType };
export default NoticeService;
