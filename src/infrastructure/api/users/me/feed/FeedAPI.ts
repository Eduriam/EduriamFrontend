import { Modify } from "domain/models/utils/modify";

import { FetchHook } from "infrastructure/api/API";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";

import { FeedMessage } from "./Feed";

const FeedAPI = {
  URI: "users/me/feed",

  useFeed(): Modify<
    FetchHook<Array<FeedMessage>>,
    { feed: Array<FeedMessage> }
  > {
    const { data, ...rest } = useAuthenticatedAPI<Array<FeedMessage>>(this.URI);
    return { feed: data, ...rest };
  },
};

export default FeedAPI;
