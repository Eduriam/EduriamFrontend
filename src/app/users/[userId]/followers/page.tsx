"use client";

import type { Id } from "domain/models/types/core";
import {
  BasicNavbar,
  ContentContainer,
  PageRoot,
  Tabs,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { parseRequiredId } from "util/functions/api";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useEffect, useMemo, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import UserList from "components/atoms/UserList/UserList";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { optimisticMutationOption } from "infrastructure/api/API";
import { Follower } from "infrastructure/api/users/followers/Followers";
import FollowersAPI from "infrastructure/api/users/followers/FollowersAPI";
import { Following } from "infrastructure/api/users/following/Following";
import FollowingAPI from "infrastructure/api/users/following/FollowingAPI";
import UserFollowingAPI from "infrastructure/api/users/me/following/UserFollowingAPI";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const navigateWithTransition = useTransitionNavigationHandler();
  const { t } = useTranslation("common");
  const { user } = useAuth();
  const userId = parseRequiredId(params.userId);
  const safeUserId = userId ?? 0;

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
    safeUserId,
  );
  const { following, mutate: mutateFollowing } = FollowingAPI.useFollowing(
    safeUserId,
  );

  useEffect(() => {
    if (userId === null) {
      router.replace("/");
    }
  }, [router, userId]);

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
        await UserFollowingAPI.followUser(itemId);
      } else {
        await UserFollowingAPI.unfollowUser(itemId);
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
        await UserFollowingAPI.followUser(itemId);
      } else {
        await UserFollowingAPI.unfollowUser(itemId);
      }

      return nextFollowing;
    }, optimisticMutationOption<Array<Following>>(nextFollowing));
  };

  return (
    <PageRoot>
      <PageNavigation
        topNavigation={
          <BasicNavbar
            leftButton={{
              icon: "arrowLeft",
              onClick: navigateWithTransition(`/users/${safeUserId}`, {
                direction: "back",
              }),
            }}
          />
        }
        mainNavigation="hidden"
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

        <UserList
          items={items}
          currentUserId={user?.id}
          onUserClick={(userId) => navigateWithTransition(`/users/${userId}`)()}
          onFollowToggle={(itemId, isFollowed) => {
            if (value === "followers") {
              updateFollower(itemId, isFollowed);
            } else {
              updateFollowing(itemId, isFollowed);
            }
          }}
        />
      </ContentContainer>
    </PageRoot>
  );
};

export default FollowersPage;
