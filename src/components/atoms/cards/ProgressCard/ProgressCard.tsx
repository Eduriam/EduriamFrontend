import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

export interface IProgressCard {
  header: string;
  subheader?: string;
  imageUrl?: string;
  onClick?: () => void;
  cardHighlight?: "achieved" | "selected";
  progress?: number;
  claimReward?: boolean;
  onRewardClick?: () => void;
  variant?: "small" | "medium" | "large";
}

const ProgressCard: React.FC<IProgressCard> = ({
  header,
  subheader,
  imageUrl,
  onClick,
  cardHighlight,
  progress,
  claimReward,
  onRewardClick,
  variant,
}) => {
  const { t } = useTranslation("common");
  const imgSize =
    variant === "small" ? "50px" : variant === "large" ? "100px" : "80px";

  return (
    <Card
      sx={{
        backgroundColor: cardHighlight === "achieved" ? "#f2e300" : undefined,

        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        gap:
          (claimReward && variant !== "small") ||
          (claimReward && variant === "small" && progress === 100)
            ? 0
            : 1,
      }}
    >
      <CardActionArea
        sx={{
          px: 2,
          pt: 2,
          pb:
            progress === undefined || cardHighlight === "achieved"
              ? 2
              : undefined,
        }}
        onClick={onClick}
      >
        <Box sx={{ display: "flex" }}>
          {imageUrl && (
            <CardMedia
              sx={{
                height: imgSize,
                width: imgSize,
                minWidth: imgSize,
                minHeight: imgSize,
              }}
              image={imageUrl}
            />
          )}
          <CardContent
            sx={{
              py: 0,
              "&:last-child": {
                paddingBottom: 0,
              },
            }}
          >
            <Typography variant="subtitle2">{header}</Typography>
            <Typography variant="body1">{subheader}</Typography>
          </CardContent>
        </Box>
      </CardActionArea>
      {progress !== undefined && cardHighlight !== "achieved" && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            pb: 2,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              color="primary"
            />
          </Box>
          {((claimReward && variant !== "small") ||
            (claimReward && variant === "small" && progress === 100)) && (
            <Button
              variant="contained"
              size="small"
              onClick={onRewardClick}
              disabled={progress !== 100}
            >
              {t("achievements.collectReward")}
            </Button>
          )}
        </Box>
      )}
    </Card>
  );
};

export default ProgressCard;
