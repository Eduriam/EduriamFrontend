"use client";

import {
  BasicNavbar,
  ContentContainer,
  Icon,
  PageRoot,
  Tabs,
} from "@eduriam/ui-core";
import { buildShopAvatar } from "app/shop/utils/avatar";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useMemo, useState } from "react";

import { useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Avatar from "components/avatar/Avatar";

import { optimisticMutationOption } from "infrastructure/api/API";
import UserFollowingAPI from "infrastructure/api/user/following/UserFollowingAPI";
import { Follower } from "infrastructure/api/users/followers/Followers";
import FollowersAPI from "infrastructure/api/users/followers/FollowersAPI";
import { Following } from "infrastructure/api/users/following/Following";
import FollowingAPI from "infrastructure/api/users/following/FollowingAPI";
import useAuth from "infrastructure/services/AuthProvider";

export interface IFollowersPage {
  params: {
    userId: string;
  };
}

function normalizeUserList<T>(data: unknown): Array<T> {
  if (Array.isArray(data)) {
    return data as Array<T>;
  }

  if (data && typeof data === "object") {
    const possibleListContainer = data as {
      items?: unknown;
      followers?: unknown;
      following?: unknown;
      data?: unknown;
    };

    const nestedList =
      possibleListContainer.items ??
      possibleListContainer.followers ??
      possibleListContainer.following ??
      possibleListContainer.data;

    if (Array.isArray(nestedList)) {
      return nestedList as Array<T>;
    }
  }

  return [];
}

const FollowersPage: React.FC<IFollowersPage> = ({ params }) => {
  const searchParams = useSearchParams();
  const navigateWithTransition = useTransitionNavigationHandler();
  const { t } = useTranslation("common");
  const { user } = useAuth();

  function getInitialState(): "followers" | "following" {
    switch (searchParams?.get("val")) {
      case "followers":
        return "followers";
      case "following":
        return "following";
      default:
        return "followers";
    }
  }

  const [value, setValue] = useState<"followers" | "following">(
    getInitialState,
  );
  const { followers, mutate: mutateFollowers } = FollowersAPI.useFollowers(
    params.userId,
  );
  const { following, mutate: mutateFollowing } = FollowingAPI.useFollowing(
    params.userId,
  );

  const tabs = useMemo(
    () => [
      { label: t("navigation.followers"), value: "followers" },
      { label: t("navigation.following"), value: "following" },
    ],
    [t],
  );

  const followerItems = normalizeUserList<Follower>(followers);
  const followingItems = normalizeUserList<Following>(following);
  const items = value === "followers" ? followerItems : followingItems;

  const updateFollower = (itemId: Id, isFollowed: boolean) => {
    if (!user?.id) {
      return;
    }

    const nextFollowers = followerItems.map((item) =>
      item.id === itemId ? { ...item, isFollowed } : item,
    );

    mutateFollowers(async () => {
      if (isFollowed) {
        await UserFollowingAPI.followUser(user.id, itemId);
      } else {
        await UserFollowingAPI.unfollowUser(user.id, itemId);
      }

      return nextFollowers;
    }, optimisticMutationOption<Array<Follower>>(nextFollowers));
  };

  const updateFollowing = (itemId: Id, isFollowed: boolean) => {
    if (!user?.id) {
      return;
    }

    const nextFollowing = followingItems.map((item) =>
      item.id === itemId ? { ...item, isFollowed } : item,
    );

    mutateFollowing(async () => {
      if (isFollowed) {
        await UserFollowingAPI.followUser(user.id, itemId);
      } else {
        await UserFollowingAPI.unfollowUser(user.id, itemId);
      }

      return nextFollowing;
    }, optimisticMutationOption<Array<Following>>(nextFollowing));
  };

  return (
    <PageRoot>
      <BasicNavbar
        leftButton={{
          icon: "arrowLeft",
          onClick: navigateWithTransition(`/users/${params.userId}`, {
            direction: "back",
          }),
        }}
      />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="none"
      >
        <Tabs
          tabs={tabs}
          value={value}
          onChange={(next) => setValue(next as "followers" | "following")}
          variant="fullWidth"
        />

        <Box sx={{ width: "100%", mt: 1 }}>
          {items.map((item, index) => (
            <Box key={item.id}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ py: 1, px: 0.5 }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{
                    minWidth: 0,
                    flexGrow: 1,
                    cursor: "pointer",
                  }}
                  onClick={navigateWithTransition(`/users/${item.id}`)}
                >
                  <Avatar
                    definition={buildShopAvatar(item.avatarDefinition)}
                    size={64}
                    alt={item.name}
                  />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body1" noWrap>
                      {item.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" noWrap>
                      @{item.username}
                    </Typography>
                  </Box>
                </Stack>

                {item.id !== user?.id && (
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      if (value === "followers") {
                        updateFollower(item.id, !item.isFollowed);
                      } else {
                        updateFollowing(item.id, !item.isFollowed);
                      }
                    }}
                  >
                    <Icon name={item.isFollowed ? "unfollow" : "follow"} />
                  </IconButton>
                )}
              </Stack>

              {index < items.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
      </ContentContainer>
    </PageRoot>
  );
};

export default FollowersPage;
