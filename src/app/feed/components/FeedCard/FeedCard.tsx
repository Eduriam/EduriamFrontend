import { Card, Icon, Illustration } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";

import Avatar from "components/avatar/Avatar";

import {
  FeedMessageType,
  FeedReactionType,
  LeagueType,
} from "infrastructure/api/generated/models";
import type {
  FeedItemResponseModel,
  FeedReactionType as FeedReactionTypeValue,
} from "infrastructure/api/generated/models";

export interface IFeedCard {
  feedMessage: FeedItemResponseModel;
  onAddReaction: (reactionType: FeedReactionTypeValue) => void;
  onRemoveReaction: (reactionType: FeedReactionTypeValue) => void;
}

type ReactionIllustrationName =
  | "confetti"
  | "heart"
  | "muscle"
  | "clappingHands"
  | "sunglasses";

const allowedReactions: Array<FeedReactionTypeValue> = [
  FeedReactionType.Confetti,
  FeedReactionType.Heart,
  FeedReactionType.Muscle,
  FeedReactionType.ClappingHands,
  FeedReactionType.Sunglasses,
];

const reactionIllustrationMap: Record<FeedReactionTypeValue, ReactionIllustrationName> = {
  [FeedReactionType.Confetti]: "confetti",
  [FeedReactionType.Heart]: "heart",
  [FeedReactionType.Muscle]: "muscle",
  [FeedReactionType.ClappingHands]: "clappingHands",
  [FeedReactionType.Sunglasses]: "sunglasses",
};

const reactionTestIdMap: Record<FeedReactionTypeValue, string> = {
  [FeedReactionType.Confetti]: "confetti",
  [FeedReactionType.Heart]: "heart",
  [FeedReactionType.Muscle]: "muscle",
  [FeedReactionType.ClappingHands]: "clapping-hands",
  [FeedReactionType.Sunglasses]: "sunglasses",
};

const leagueTranslationMap: Record<LeagueType, string> = {
  [LeagueType.Iron]: "iron",
  [LeagueType.Bronze]: "bronze",
  [LeagueType.Silver]: "silver",
  [LeagueType.Gold]: "gold",
  [LeagueType.Platinum]: "platinum",
  [LeagueType.Emerald]: "emerald",
  [LeagueType.Ruby]: "ruby",
  [LeagueType.Sapphire]: "sapphire",
  [LeagueType.Diamond]: "diamond",
  [LeagueType.Mythic]: "mythic",
};

function getMessageTestId(messageType: FeedMessageTypeValue): string {
  switch (messageType) {
    case FeedMessageType.StreakMilestone:
      return "streak-milestone";
    case FeedMessageType.AchievementEarned:
      return "achievement-earned";
    case FeedMessageType.LeaguePromoted:
      return "league-promoted";
    case FeedMessageType.CourseCompleted:
    default:
      return "course-completed";
  }
}

type FeedMessageTypeValue = (typeof FeedMessageType)[keyof typeof FeedMessageType];

const FeedCard: React.FC<IFeedCard> = ({
  feedMessage,
  onAddReaction,
  onRemoveReaction,
}) => {
  const { t } = useTranslation("common");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const messageTestId = useMemo(
    () => getMessageTestId(feedMessage.message),
    [feedMessage.message],
  );
  const messageText = useMemo(() => {
    switch (feedMessage.message) {
      case FeedMessageType.StreakMilestone:
        return t("feed.messages.streak_milestone", {
          streak: feedMessage.streak,
        });
      case FeedMessageType.AchievementEarned:
        return t("feed.messages.achievement_earned", {
          achievementName: t(
            `achievements.achievementsById.${String(feedMessage.achievementId ?? "")}`,
          ),
        });
      case FeedMessageType.LeaguePromoted:
        return t("feed.messages.league_promoted", {
          league: t(
            `leaderboard.leagues.${leagueTranslationMap[feedMessage.league ?? LeagueType.Iron]}`,
          ),
        });
      case FeedMessageType.CourseCompleted:
        return t("feed.messages.course_completed", {
          courseName: feedMessage.productName ?? "",
        });
      default:
        return "";
    }
  }, [feedMessage, t]);

  const open = Boolean(anchorEl);

  const relativeTimeLabel = useMemo(() => {
    const publishedAt = new Date(feedMessage.publishedAt);
    const today = new Date();

    if (Number.isNaN(publishedAt.getTime())) {
      return "";
    }

    const publishedAtStart = new Date(
      publishedAt.getFullYear(),
      publishedAt.getMonth(),
      publishedAt.getDate(),
    );
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const diffInMs = todayStart.getTime() - publishedAtStart.getTime();
    const diffInDays = Math.max(
      0,
      Math.floor(diffInMs / (1000 * 60 * 60 * 24)),
    );

    if (diffInDays === 0) {
      return t("feed.today");
    }

    return t("feed.daysAgo", { count: diffInDays });
  }, [feedMessage.publishedAt, t]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box data-test={`${messageTestId}-feed-message-section`}>
      <Card paddingX="medium" paddingY="medium">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar
              definition={feedMessage.avatar}
              size={48}
              alt={feedMessage.author}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                flex: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 36 / 1.6,
                    lineHeight: "28px",
                    fontWeight: 500,
                  }}
                >
                  {feedMessage.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {relativeTimeLabel}
                </Typography>
              </Box>

              <Typography variant="body1">{messageText}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {feedMessage.reactions
              .filter((reaction) =>
                allowedReactions.includes(reaction.reactionType),
              )
              .map((reaction) => (
                <Box
                  key={`${feedMessage.id}-${reaction.reactionType}`}
                  data-test={`${messageTestId}-${reactionTestIdMap[reaction.reactionType]}-reaction-section`}
                  onClick={() => {
                    const hasUserReaction = (reaction.userReactions?.length ?? 0) > 0;

                    if (hasUserReaction) {
                      onRemoveReaction(reaction.reactionType);
                      return;
                    }

                    onAddReaction(reaction.reactionType);
                  }}
                  sx={{
                    height: 32,
                    px: 2,
                    borderRadius: "16px",
                    border: "1px solid",
                    borderColor: (reaction.userReactions?.length ?? 0) > 0
                      ? "primary.main"
                      : "divider",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    cursor: "pointer",
                  }}
                >
                  <Illustration
                    name={reactionIllustrationMap[reaction.reactionType]}
                    width={20}
                    height={20}
                  />
                  <Typography variant="body1" color="text.secondary">
                    {reaction.count}
                  </Typography>
                </Box>
              ))}

            <IconButton
              data-test={`${messageTestId}-add-reaction-button`}
              onClick={handleMenuOpen}
              sx={{ width: 32, height: 32 }}
            >
              <Icon name="addReaction" sx={{ fontSize: 24 }} />
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <Box sx={{ p: 0.5, display: "flex", gap: 0.5 }}>
                {allowedReactions.map((reaction) => (
                  <IconButton
                    key={`${feedMessage.id}-${reaction}-add`}
                    data-test={`${reactionTestIdMap[reaction]}-reaction-option-button`}
                    onClick={() => {
                      onAddReaction(reaction);
                      handleMenuClose();
                    }}
                  >
                    <Illustration
                      name={reactionIllustrationMap[reaction]}
                      width={20}
                      height={20}
                    />
                  </IconButton>
                ))}
              </Box>
            </Menu>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default FeedCard;
