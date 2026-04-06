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
import type { GetFollowerModel } from "infrastructure/api/generated/models";
import useAuth from "infrastructure/services/AuthProvider";
import { UserService } from "infrastructure/services/users/UserService";
import { UsersService } from "infrastructure/services/users/UsersService";

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
  const { followers, mutate: mutateFollowers } = UsersService.useFollowers(
    safeUserId,
  );
  const { following, mutate: mutateFollowing } = UsersService.useFollowing(
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

  const followerItems = normalizeUserList<GetFollowerModel>(followers);
  const followingItems = normalizeUserList<GetFollowerModel>(following);
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
        await UserService.followUser(itemId);
      } else {
        await UserService.unfollowUser(itemId);
      }

      return nextFollowers;
    }, optimisticMutationOption<Array<GetFollowerModel>>(nextFollowers));
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
        await UserService.followUser(itemId);
      } else {
        await UserService.unfollowUser(itemId);
      }

      return nextFollowing;
    }, optimisticMutationOption<Array<GetFollowerModel>>(nextFollowing));
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
