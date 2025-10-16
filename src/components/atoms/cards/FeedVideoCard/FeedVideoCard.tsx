import { YouTubeVideoEmbed } from "@eduriam/ui-core";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { FeedVideo } from "infrastructure/api/user/feed/Feed";

export interface IFeedVideoCard {
  feedVideo: FeedVideo;
}

const FeedVideoCard: React.FC<IFeedVideoCard> = ({ feedVideo }) => {
  return (
    <Card>
      <CardMedia sx={{ aspectRatio: "16 / 9" }}>
        <YouTubeVideoEmbed videoId="Tyq0oivryDQ" />
      </CardMedia>
      <Box sx={{ py: 1, px: 1 }}>
        <Typography>{feedVideo.title}</Typography>
      </Box>
    </Card>
  );
};

export default FeedVideoCard;
