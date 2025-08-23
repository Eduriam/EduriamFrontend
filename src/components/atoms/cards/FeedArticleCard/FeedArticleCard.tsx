import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { FeedArticle } from "infrastructure/api/user/feed/Feed";

export interface IFeedArticleCard {
  feedArticle: FeedArticle;
}

const FeedArticleCard: React.FC<IFeedArticleCard> = ({ feedArticle }) => {
  const router = useRouter();

  return (
    <Card>
      <CardActionArea onClick={() => router.push(feedArticle.link)}>
        <CardMedia sx={{ height: 140 }} image={feedArticle.imageUrl} />
        <Box sx={{ py: 1, px: 1 }}>
          <Typography>{feedArticle.title}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default FeedArticleCard;
