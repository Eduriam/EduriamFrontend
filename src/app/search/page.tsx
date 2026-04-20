"use client";

import type { Id } from "domain/models/types/core";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import UserList from "components/atoms/UserList/UserList";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { optimisticMutationOption } from "infrastructure/api/API";
import type { GetUserSimpleModel } from "infrastructure/api/generated/models";
import useAuth from "infrastructure/services/AuthProvider";
import { UserService } from "infrastructure/services/users/UserService";
import { UsersService } from "infrastructure/services/users/UsersService";

import SearchTextField from "./components/SearchTextField/SearchTextField";

export interface ISearchPagePage {}

function normalizeUserList<T>(data: unknown): Array<T> {
  if (Array.isArray(data)) {
    return data as Array<T>;
  }

  if (data && typeof data === "object") {
    const possibleListContainer = data as {
      items?: unknown;
      users?: unknown;
      data?: unknown;
    };

    const nestedList =
      possibleListContainer.items ??
      possibleListContainer.users ??
      possibleListContainer.data;

    if (Array.isArray(nestedList)) {
      return nestedList as Array<T>;
    }
  }

  return [];
}

const SearchPagePage: React.FC<ISearchPagePage> = () => {
  const { t } = useTranslation("common");
  const [searchPrompt, setSearchPrompt] = useState("");
  const navigateWithTransition = useTransitionNavigationHandler();
  const { user } = useAuth();
  const { users, mutate } = UsersService.useUsers({
    SearchName: searchPrompt.toLowerCase(),
  });

  const userResults = normalizeUserList<GetUserSimpleModel>(users);

  const handleFollowChange = (targetUserId: Id, isFollowed: boolean) => {
    if (!user?.id) {
      return;
    }

    const nextUsers = userResults.map((userItem) =>
      userItem.id === targetUserId ? { ...userItem, isFollowed } : userItem,
    );

    mutate(async () => {
      if (isFollowed) {
        await UserService.followUser(targetUserId);
      } else {
        await UserService.unfollowUser(targetUserId);
      }

      return nextUsers;
    }, optimisticMutationOption(nextUsers));
  };

  return (
    <PageRoot data-test="search-page">
      <PageNavigation
        topNavigation={
          <BasicNavbar
            leftButton={{
              icon: "arrowLeft",
              onClick: navigateWithTransition("/", { direction: "back" }),
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
        <SearchTextField
          placeholder={t("search.nameOrUsername")}
          value={searchPrompt}
          onChange={setSearchPrompt}
        />

        <Box sx={{ width: "100%", mt: 2 }}>
          {userResults.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              {t("search.noUsersFound")}
            </Typography>
          ) : (
            <UserList
              items={userResults}
              currentUserId={user?.id}
              onUserClick={(userId) =>
                navigateWithTransition(`/users/${userId}`)()
              }
              onFollowToggle={handleFollowChange}
            />
          )}
        </Box>
      </ContentContainer>
    </PageRoot>
  );
};

export default SearchPagePage;
