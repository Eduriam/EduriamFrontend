import { Modify } from "domain/models/utils/modify";

import { FetchHook } from "infrastructure/api/API";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";

import { FeedItem } from "./Feed";

const FeedAPI = {
  URI: "users/me/feed",

  useFeed(): Modify<FetchHook<Array<FeedItem>>, { feed: Array<FeedItem> }> {
    const { data, ...rest } = useAuthenticatedAPI<Array<FeedItem>>(this.URI);
    return { feed: data, ...rest };
  },
};

export default FeedAPI;


