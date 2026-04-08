import type { Id } from "domain/models/types/core";

import {
  NoticeType,
  type GetApiUsersMeNoticesParams,
  type LeaderboardLeague,
  type NoticeModel,
} from "infrastructure/api/generated/models";
import { getUsers } from "infrastructure/api/generated/users/users";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

export interface Notice extends NoticeModel {
  streakDays?: number;
  previousStreakDays?: number;
  freezesLeft?: number;
  league?: LeaderboardLeague | null;
  title?: string;
  description?: string;
  badgeIconName?: "achievement-1" | "achievement-2";
  chestId?: Id;
  reward?: number;
  daysLeft?: number;
}

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
    } catch (error) {
      return toErrorCode(error);
    }
  },
};

export { NoticeType };
export default NoticeService;
