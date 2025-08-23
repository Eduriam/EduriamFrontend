import { useTranslation } from "i18n/client";

import { ReactNode } from "react";

import Box from "@mui/material/Box";

import DividerWithText from "components/atoms/DividerWithText/DividerWithText";
import FeedArticleCard from "components/atoms/cards/FeedArticleCard/FeedArticleCard";
import FeedMessageCard from "components/atoms/cards/FeedMessageCard/FeedMessageCard";
import FeedVideoCard from "components/atoms/cards/FeedVideoCard/FeedVideoCard";

import { optimisticMutationOption } from "infrastructure/api/API";
import { FeedItem, FeedMessage } from "infrastructure/api/user/feed/Feed";
import FeedAPI from "infrastructure/api/user/feed/FeedAPI";
import {
  isFeedArticle,
  isFeedMessage,
  isFeedVideo,
} from "infrastructure/api/user/feed/FeedGuard";
import {
  Reaction,
  ReactionId,
} from "infrastructure/api/user/feed/reactions/Reactions";
import ReactionsAPI from "infrastructure/api/user/feed/reactions/ReactionsAPI";

export interface IFeedPaginationPage {
  index: number;
  onDividerDisplayed: () => void;
  displayDivider: boolean;
}

const FeedPaginationPage: React.FC<IFeedPaginationPage> = ({
  index,
  onDividerDisplayed,
  displayDivider,
}) => {
  const { t } = useTranslation("common");
  const { feed, mutate } = FeedAPI.useFeed({ page: index });

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
      if (item.id === feedItem.id) return { ...item, reactions };
      else return item;
    });

    mutate(async () => {
      if (reacted) await ReactionsAPI.addReaction(feedItem.id, reactionId);
      else await ReactionsAPI.deleteReaction(feedItem.id, reactionId);

      return newFeed;
    }, optimisticMutationOption<Array<FeedItem>>(newFeed));
  }

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
      .filter((reaction) => reaction.counter !== 0);

    if (reacted && !reactionExists)
      newReactions.push({
        counter: 1,
        reactedByUser: true,
        id: reactionId,
      });

    return newReactions;
  }

  function renderFeed() {
    const markup: Array<ReactNode> = [];
    let hasDivider = false;

    feed.forEach((feedItem, i) => {
      if (!hasDivider && displayDivider && feedItem.seenByUser === true) {
        hasDivider = true;
        onDividerDisplayed();

        if (i !== 0)
          markup.push(
            <Box>
              <DividerWithText
                key={`${feedItem.id}-divider`}
                text={t("feed.earlier")}
                variant="subtitle2"
              />
            </Box>,
          );
      }
      if (isFeedArticle(feedItem))
        markup.push(
          <FeedArticleCard key={feedItem.id} feedArticle={feedItem} />,
        );
      if (isFeedVideo(feedItem))
        markup.push(<FeedVideoCard key={feedItem.id} feedVideo={feedItem} />);
      if (isFeedMessage(feedItem))
        markup.push(
          <FeedMessageCard
            key={feedItem.id}
            feedMessage={feedItem}
            onAddReaction={(reactionId) =>
              handleReactionUpdate(feedItem, reactionId, true)
            }
            onRemoveReaction={(reactionId) =>
              handleReactionUpdate(feedItem, reactionId, false)
            }
          />,
        );
    });

    return markup;
  }

  return <>{feed && renderFeed()}</>;
};

export default FeedPaginationPage;
