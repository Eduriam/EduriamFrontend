import { Icon } from "@eduriam/ui-core";
import { buildShopAvatar } from "app/shop/utils/avatar";
import { useTranslation } from "i18n/client";

import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Avatar from "components/avatar/Avatar";

import { UserProfile } from "infrastructure/api/users/Users";
import useAuth from "infrastructure/services/AuthProvider";

export interface IUserProfileCard {
  userProfile: Pick<
    UserProfile,
    | "username"
    | "name"
    | "followers"
    | "following"
    | "level"
    | "profileImageUrl"
    | "avatarDefinition"
    | "id"
    | "isFollowed"
  >;
  userId: Id;
  onFollowChange: (isFollowed: boolean) => void;
}

const UserProfileCard: React.FC<IUserProfileCard> = ({
  userProfile,
  userId,
  onFollowChange,
}) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { user } = useAuth();

  return (
    <Card>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: 1, pb: 0 }}
      >
        <Box display="flex" gap={2}>
          <Box>
            {userProfile.avatarDefinition ? (
              <Avatar
                definition={buildShopAvatar(userProfile.avatarDefinition)}
                size={104}
                alt={userProfile.name}
              />
            ) : (
              <Box
                component="img"
                src={userProfile.profileImageUrl}
                alt={userProfile.name}
                sx={{ width: "104px", height: "104px", borderRadius: "50%" }}
              />
            )}
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {userProfile.name}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {`${t("userProfile.level")}: ${userProfile.level}`}
            </Typography>
            <Typography variant="body2">@{userProfile.username}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around", gap: 1 }}>
          <Button
            onClick={() => {
              router.push(`/users/${userId}/followers`);
            }}
          >{`${t("userProfile.followers")} ${userProfile.followers}`}</Button>
          <Button
            onClick={() => {
              router.push(`/users/${userId}/followers?val=following`);
            }}
          >{`${t("userProfile.following")} ${userProfile.following}`}</Button>

          {user?.id === userId && (
            <Button
              variant="outlined"
              onClick={() => router.push("/edit-avatar")}
              data-test="edit-avatar-button"
            >
              {t("avatarEditor.editAvatar")}
            </Button>
          )}

          {user?.id !== userId && (
            <Button
              variant="contained"
              startIcon={
                userProfile.isFollowed ? (
                  <Icon name="unfollow" />
                ) : (
                  <Icon name="follow" />
                )
              }
              onClick={() => onFollowChange(!userProfile.isFollowed)}
            >
              {userProfile.isFollowed
                ? t("userProfile.userIsFollowing")
                : t("userProfile.userIsNotFollowing")}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
