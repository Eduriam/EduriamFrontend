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
import type {
  FeedItemResponseModel,
  FeedReactionGroupModel,
  FeedReactionType,
  FeedUserReactionModel,
} from "infrastructure/api/generated/models";
import { FeedService } from "infrastructure/services/feed/FeedService";

import FeedCard from "./components/FeedCard/FeedCard";

export interface IFeed {}

const Feed: React.FC<IFeed> = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
  const { feed = [], mutate } = FeedService.useFeed();

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

  function createOptimisticUserReaction(
    reactionType: FeedReactionType,
  ): FeedUserReactionModel {
    return {
      id: Date.now(),
      reactionType,
      userId: 0,
      reactedAt: new Date().toISOString(),
    };
  }

  function updateReactionArray(
    reactions: Array<FeedReactionGroupModel>,
    reactionType: FeedReactionType,
    reacted: boolean,
  ): Array<FeedReactionGroupModel> {
    let hasReactionGroup = false;

    const newReactions: Array<FeedReactionGroupModel> = reactions
      .map((reaction) => {
        if (reaction.reactionType === reactionType) {
          hasReactionGroup = true;
          const hasUserReaction = (reaction.userReactions?.length ?? 0) > 0;
          const nextCount =
            !hasUserReaction && reacted
              ? reaction.count + 1
              : hasUserReaction && !reacted
                ? reaction.count - 1
                : reaction.count;
          const nextUserReactions = reacted
            ? hasUserReaction
              ? reaction.userReactions
              : [
                  ...(reaction.userReactions ?? []),
                  createOptimisticUserReaction(reactionType),
                ]
            : hasUserReaction
              ? (reaction.userReactions ?? []).slice(1)
              : reaction.userReactions;

          return {
            ...reaction,
            count: nextCount,
            userReactions: nextUserReactions,
          };
        }

        return reaction;
      })
      .filter((reaction) => reaction.count > 0);

    if (reacted && !hasReactionGroup) {
      newReactions.push({
        reactionType,
        count: 1,
        userReactions: [createOptimisticUserReaction(reactionType)],
      });
    }

    return newReactions;
  }

  function handleReactionUpdate(
    feedItem: FeedItemResponseModel,
    reactionType: FeedReactionType,
    reacted: boolean,
  ) {
    const reactions = updateReactionArray(
      feedItem.reactions,
      reactionType,
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
        await FeedService.addReaction(feedItem.id, reactionType);
      } else {
        await FeedService.deleteReaction(feedItem.id, reactionType);
      }

      return newFeed;
    }, optimisticMutationOption<Array<FeedItemResponseModel>>(newFeed));
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
