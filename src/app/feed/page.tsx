"use client";

import FeedOverview from "components/layouts/FeedOverview/FeedOverview";

export interface IFeed {}

const Feed: React.FC<IFeed> = () => {
  return <FeedOverview />;
};

export default Feed;
