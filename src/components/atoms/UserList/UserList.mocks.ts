import { action } from "@storybook/addon-actions";

import { IUserList } from "./UserList";

const base: IUserList = {
  currentUserId: "current-user-id",
  onUserClick: action("onUserClick"),
  onFollowToggle: action("onFollowToggle"),
  items: [
    {
      id: "user-1",
      name: "User Name",
      username: "username",
      isFollowed: true,
      avatarDefinition: {
        skinColor: "light",
        eyes: "eyes_1",
        eyeColor: "darkBrown",
        expression: "expression_1",
        hair: "hair_1",
        hairColor: "darkBrown",
        clothing: "shirt_1",
        backgroundColor: "lightGray",
      },
    },
    {
      id: "user-2",
      name: "Another User",
      username: "another_username",
      isFollowed: false,
      avatarDefinition: {
        skinColor: "light",
        eyes: "eyes_1",
        eyeColor: "darkBrown",
        expression: "expression_1",
        hair: "hair_1",
        hairColor: "darkBrown",
        clothing: "shirt_1",
        backgroundColor: "lightGray",
      },
    },
  ],
};

export const mockUserListProps = {
  base,
};

