import type { Id } from "domain/models/types/core";
import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import { FetchHook } from "infrastructure/api/API";
import type {
  FeedItemResponseModel,
  FeedReactionType,
  GetApiUsersMeFeedParams,
} from "infrastructure/api/generated/models";
import { getUsers } from "infrastructure/api/generated/users/users";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

export interface FeedParams {
  page?: number;
  pageSize?: number;
}

const useFeedQuery = (
  params: FeedParams = {},
): Modify<FetchHook<Array<FeedItemResponseModel>>, { feed: Array<FeedItemResponseModel> }> => {
  const query = parseQueryParams(params);
  const key = query ? `users/me/feed?${query}` : "users/me/feed";
  const { data, ...rest } = useAuthenticatedAPI<Array<FeedItemResponseModel>>(
    key,
    async () => FeedService.getFeed(params),
  );

  return { feed: data, ...rest };
};

export const FeedService = {
  async getFeed(params: FeedParams = {}): Promise<Array<FeedItemResponseModel>> {
    try {
      const queryParams: GetApiUsersMeFeedParams = {
        Page: params.page,
        PageSize: params.pageSize,
      };
      const response = await usersClient.getApiUsersMeFeed(queryParams);
      const items = response.data?.items ?? [];

      return items;
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async addReaction(feedItemId: Id, reactionType: FeedReactionType): Promise<void> {
    try {
      await usersClient.putApiUsersMeFeedFeedItemIdReactionsReactionId(
        feedItemId,
        reactionType,
      );
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async deleteReaction(feedItemId: Id, reactionType: FeedReactionType): Promise<void> {
    try {
      await usersClient.deleteApiUsersMeFeedFeedItemIdReactionsReactionId(
        feedItemId,
        reactionType,
      );
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async markSeen(feedItemIds: Array<Id>): Promise<void> {
    try {
      await usersClient.postApiUsersMeFeedMarkSeen({ feedItemIds });
    } catch (error) {
      return toErrorCode(error);
    }
  },

  useFeed(
    params: FeedParams = {},
  ): Modify<FetchHook<Array<FeedItemResponseModel>>, { feed: Array<FeedItemResponseModel> }> {
    return useFeedQuery(params);
  },
};
