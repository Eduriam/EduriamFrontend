import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { FeedItem } from "./Feed";

export interface FeedParams {
  page?: number;
}

const FeedAPI = {
  URI: "user/feed",

  useFeed(
    params: FeedParams = {},
  ): Modify<FetchHook<Array<FeedItem>>, { feed: Array<FeedItem> }> {
    const { data, ...rest } = useAPI<Array<FeedItem>>(
      `${this.URI}?${parseQueryParams(params)}`,
    );
    return { feed: data, ...rest };
  },
};

export default FeedAPI;
