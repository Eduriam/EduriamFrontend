"use client";

import {
  BasicNavbar,
  ContentContainer,
  Header,
  LargeButton,
  PageRoot,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useMemo } from "react";

import Stack from "@mui/material/Stack";

import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { optimisticMutationOption } from "infrastructure/api/API";
import { FeedItem, FeedMessage } from "infrastructure/api/users/me/feed/Feed";
import FeedAPI from "infrastructure/api/users/me/feed/FeedAPI";
import {
  Reaction,
  ReactionId,
} from "infrastructure/api/users/me/feed/reactions/Reactions";
import ReactionsAPI from "infrastructure/api/users/me/feed/reactions/ReactionsAPI";

import FeedCard from "./components/FeedCard/FeedCard";

export interface IFeed {}

const Feed: React.FC<IFeed> = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
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
    const reactions = updateReactionArray(
      feedItem.reactions,
      reactionId,
      reacted,
    );

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
      <PageNavigation
        topNavigation={<BasicNavbar header={t("navigation.feed")} />}
        mainNavigation="show"
      />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="none"
      >
        {sortedFeed.length > 0 ? (
          <Stack
            data-test="feed-message-list-section"
            direction="column"
            spacing={4}
            width="100%"
          >
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
        ) : (
          <Stack
            data-test="no-feed-messages-section"
            spacing={8}
            width="100%"
            alignItems="center"
            pt={16}
          >
            <Stack
              data-test="no-feed-messages-text-section"
              spacing={2}
              alignItems="center"
              maxWidth={560}
            >
              <Header
                variant="section"
                text={t("feed.empty.title")}
                align="center"
              />
            </Stack>

            <LargeButton
              data-test="add-friends-button"
              fullWidth
              onClick={navigateWithTransition("/search")}
            >
              {t("feed.empty.addFriends")}
            </LargeButton>
          </Stack>
        )}
      </ContentContainer>
    </PageRoot>
  );
};

export default Feed;
