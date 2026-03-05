import { Card, Icon, Illustration } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";

import Avatar from "components/avatar/Avatar";

import { FeedMessage } from "infrastructure/api/user/feed/Feed";
import { ReactionId } from "infrastructure/api/user/feed/reactions/Reactions";

export interface IFeedCard {
  feedMessage: FeedMessage;
  onAddReaction: (reactionId: ReactionId) => void;
  onRemoveReaction: (reactionId: ReactionId) => void;
}

const allowedReactions: Array<ReactionId> = [
  "confetti",
  "heart",
  "muscle",
  "clappingHands",
  "sunglasses",
];

const FeedCard: React.FC<IFeedCard> = ({
  feedMessage,
  onAddReaction,
  onRemoveReaction,
}) => {
  const { t } = useTranslation("common");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
    <Card paddingX="medium" paddingY="medium">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Avatar
            definition={feedMessage.avatarDefinition}
            size={48}
            alt={feedMessage.author}
          />

          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 0.5, flex: 1 }}
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

            <Typography variant="body1">
              {t(`feed.messages.${feedMessage.message}`)}
            </Typography>
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
            .filter((reaction) => allowedReactions.includes(reaction.id))
            .map((reaction) => (
              <Box
                key={`${feedMessage.id}-${reaction.id}`}
                onClick={() => {
                  if (reaction.reactedByUser) {
                    onRemoveReaction(reaction.id);
                    return;
                  }

                  onAddReaction(reaction.id);
                }}
                sx={{
                  height: 32,
                  px: 2,
                  borderRadius: "16px",
                  border: "1px solid",
                  borderColor: reaction.reactedByUser
                    ? "primary.main"
                    : "divider",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  cursor: "pointer",
                }}
              >
                <Illustration name={reaction.id} width={20} height={20} />
                <Typography variant="body1" color="text.secondary">
                  {reaction.counter}
                </Typography>
              </Box>
            ))}

          <IconButton onClick={handleMenuOpen} sx={{ width: 32, height: 32 }}>
            <Icon name="addReaction" sx={{ fontSize: 24 }} />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <Box sx={{ p: 0.5, display: "flex", gap: 0.5 }}>
              {allowedReactions.map((reaction) => (
                <IconButton
                  key={`${feedMessage.id}-${reaction}-add`}
                  onClick={() => {
                    onAddReaction(reaction);
                    handleMenuClose();
                  }}
                >
                  <Illustration name={reaction} width={20} height={20} />
                </IconButton>
              ))}
            </Box>
          </Menu>
        </Box>
      </Box>
    </Card>
  );
};

export default FeedCard;
