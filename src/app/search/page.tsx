"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SearchTextField from "./components/SearchTextField/SearchTextField";

import UserList from "components/atoms/lists/UserList/UserList";
import { optimisticMutationOption } from "infrastructure/api/API";
import UserFollowingAPI from "infrastructure/api/user/following/UserFollowingAPI";
import { UserSummary } from "infrastructure/api/users/Users";
import UsersAPI from "infrastructure/api/users/UsersAPI";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";
import useAuth from "infrastructure/services/AuthProvider";

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
  const { users, mutate } = UsersAPI.useUsers({
    searchName: searchPrompt.toLowerCase(),
  });

  const userResults = normalizeUserList<UserSummary>(users);

  const handleFollowChange = (targetUserId: Id, isFollowed: boolean) => {
    if (!user?.id) {
      return;
    }

    const nextUsers = userResults.map((userItem) =>
      userItem.id === targetUserId ? { ...userItem, isFollowed } : userItem,
    );

    mutate(
      async () => {
        if (isFollowed) {
          await UserFollowingAPI.followUser(user.id, targetUserId);
        } else {
          await UserFollowingAPI.unfollowUser(user.id, targetUserId);
        }

        return nextUsers;
      },
      optimisticMutationOption(nextUsers),
    );
  };

  return (
    <PageRoot data-test="search-page">
      <PageNavigation topNavigation={<BasicNavbar
        leftButton={{
          icon: "arrowLeft",
          onClick: navigateWithTransition("/", { direction: "back" }),
        }}
      />} mainNavigation="hidden" />

      <ContentContainer width="small" justifyContent="flex-start" paddingTop="none">
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
              onUserClick={(userId) => navigateWithTransition(`/users/${userId}`)()}
              onFollowToggle={handleFollowChange}
            />
          )}
        </Box>
      </ContentContainer>
    </PageRoot>
  );
};

export default SearchPagePage;
