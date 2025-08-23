import { useTranslation } from "i18n/client";
import icons from "styles/icons";

import { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";

import IconContainer from "components/atoms/IconContainer/IconContainer";

import { FeedMessage } from "infrastructure/api/user/feed/Feed";
import { ReactionId } from "infrastructure/api/user/feed/reactions/Reactions";

import { availableMessages, availableReactions } from "./config";

export interface IFeedMessageCard {
  feedMessage: FeedMessage;
  onAddReaction: (reactionId: ReactionId) => void;
  onRemoveReaction: (reactionId: ReactionId) => void;
}

const FeedMessageCard: React.FC<IFeedMessageCard> = ({
  feedMessage,
  onAddReaction,
  onRemoveReaction,
}) => {
  const { t } = useTranslation("common");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {availableMessages.some((message) => message === feedMessage.message) && (
        <Card>
          <CardContent sx={{ display: "flex", gap: 1, pb: 1 }}>
            <Box>
              <Avatar src={feedMessage.authorAvatarUrl}></Avatar>
            </Box>
            <Box>
              <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
                <Typography variant="body1" fontWeight="bold">
                  {feedMessage.author}
                </Typography>
                <Typography variant="body2">
                  {new Date(feedMessage.publishedAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography variant="body2">
                {t(`feed.messages.${feedMessage.message}`)}
              </Typography>
            </Box>
          </CardContent>
          <Box
            sx={{
              px: 2,
              pb: 1,
              gap: 0.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            {feedMessage.reactions.map((reaction) => {
              return (
                <>
                  {availableReactions.some((e) => e.id === reaction.id) && (
                    <Chip
                      key={`${reaction.id}-${feedMessage.id}`}
                      label={`${
                        availableReactions.find((e) => e.id === reaction.id)
                          ?.text
                      } ${reaction.counter}`}
                      variant="outlined"
                      color={reaction.reactedByUser ? "primary" : undefined}
                      size="small"
                      onClick={() => {
                        if (reaction.reactedByUser) {
                          onRemoveReaction(reaction.id);
                        } else {
                          onAddReaction(reaction.id);
                        }
                      }}
                      clickable
                    />
                  )}
                </>
              );
            })}
            <IconButton onClick={handleClick} size="small">
              <IconContainer fontSize="small" name={icons.addReaction} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <Grid container spacing={0}>
                {availableReactions.map((reaction) => {
                  return (
                    <Grid
                      xs={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                      key={`${reaction.id}-${feedMessage.id}`}
                    >
                      <IconButton
                        onClick={() => {
                          onAddReaction(reaction.id);
                          handleClose();
                        }}
                        size="small"
                      >
                        {reaction.text}
                      </IconButton>
                    </Grid>
                  );
                })}
              </Grid>
            </Menu>
          </Box>
        </Card>
      )}
    </>
  );
};

export default FeedMessageCard;
