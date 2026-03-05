"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useMemo } from "react";

import Stack from "@mui/material/Stack";

import FeedCard from "./components/FeedCard/FeedCard";

import { optimisticMutationOption } from "infrastructure/api/API";
import { FeedItem, FeedMessage } from "infrastructure/api/user/feed/Feed";
import FeedAPI from "infrastructure/api/user/feed/FeedAPI";
import {
  Reaction,
  ReactionId,
} from "infrastructure/api/user/feed/reactions/Reactions";
import ReactionsAPI from "infrastructure/api/user/feed/reactions/ReactionsAPI";

export interface IFeed {}

const Feed: React.FC<IFeed> = () => {
  const { t } = useTranslation("common");
  const { feed = [], mutate } = FeedAPI.useFeed();

  const sortedFeed = useMemo(
    () =>
      [...feed].sort((a, b) => {
        const aTime = new Date(a.publishedAt).getTime();
        const bTime = new Date(b.publishedAt).getTime();

        if (Number.isNaN(aTime) && Number.isNaN(bTime)) {
          return 0;
        }

        if (Number.isNaN(aTime)) {
          return 1;
        }

        if (Number.isNaN(bTime)) {
          return -1;
        }

        return bTime - aTime;
      }),
    [feed],
  );

  function updateReactionArray(
    reactions: Array<Reaction>,
    reactionId: ReactionId,
    reacted: boolean,
  ): Array<Reaction> {
    let reactionExists = false;

    const newReactions: Array<Reaction> = reactions
      .map((reaction) => {
        if (reaction.id === reactionId) {
          reactionExists = true;

          return {
            ...reaction,
            reactedByUser: reacted,
            counter:
              !reaction.reactedByUser && reacted
                ? reaction.counter + 1
                : reaction.reactedByUser && !reacted
                  ? reaction.counter - 1
                  : reaction.counter,
          };
        }

        return reaction;
      })
      .filter((reaction) => reaction.counter > 0);

    if (reacted && !reactionExists) {
      newReactions.push({
        counter: 1,
        reactedByUser: true,
        id: reactionId,
      });
    }

    return newReactions;
  }

  function handleReactionUpdate(
    feedItem: FeedMessage,
    reactionId: ReactionId,
    reacted: boolean,
  ) {
    const reactions = updateReactionArray(feedItem.reactions, reactionId, reacted);

    const newFeed = feed.map((item) => {
      if (item.id === feedItem.id) {
        return { ...item, reactions };
      }

      return item;
    });

    mutate(async () => {
      if (reacted) {
        await ReactionsAPI.addReaction(feedItem.id, reactionId);
      } else {
        await ReactionsAPI.deleteReaction(feedItem.id, reactionId);
      }

      return newFeed;
    }, optimisticMutationOption<Array<FeedItem>>(newFeed));
  }

  return (
    <PageRoot data-test="feed-page">
      <BasicNavbar header={t("navigation.feed")} />

      <ContentContainer width="small" justifyContent="flex-start" paddingTop="none">
        <Stack direction="column" spacing={4} width="100%">
          {sortedFeed.map((feedItem) => (
            <FeedCard
              key={feedItem.id}
              feedMessage={feedItem}
              onAddReaction={(reactionId) =>
                handleReactionUpdate(feedItem, reactionId, true)
              }
              onRemoveReaction={(reactionId) =>
                handleReactionUpdate(feedItem, reactionId, false)
              }
            />
          ))}
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default Feed;
