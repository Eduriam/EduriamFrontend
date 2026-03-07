import { action } from "@storybook/addon-actions";

import { IUsersList } from "./UsersList";

const base: IUsersList = {
  onFollow: action("onFollow"),
  onUnfollow: action("onUnfollow"),
  users: [
    {
      id: "fsaklnkjdsafdasf",
      name: "Ruth Campbell",
      isFollowed: true,
      username: "ruthcampbell",
      avatarDefinition: { skinColor: "light", eyes: "eyes_1", eyeColor: "darkBrown", expression: "expression_1", hair: "hair_1", hairColor: "darkBrown", clothing: "shirt_1", backgroundColor: "lightGray" },
    },
    {
      id: "daggfafgfafddsaf",
      name: "Danielle Smith",
      isFollowed: true,
      username: "daniellesmith",
      avatarDefinition: { skinColor: "light", eyes: "eyes_1", eyeColor: "darkBrown", expression: "expression_1", hair: "hair_1", hairColor: "darkBrown", clothing: "shirt_1", backgroundColor: "lightGray" },
    },
    {
      id: "fsdaffgbnhdnff",
      name: "Sasha Townsend",
      isFollowed: true,
      username: "sashatownsend",
      avatarDefinition: { skinColor: "light", eyes: "eyes_1", eyeColor: "darkBrown", expression: "expression_1", hair: "hair_1", hairColor: "darkBrown", clothing: "shirt_1", backgroundColor: "lightGray" },
    },
    {
      id: "ngsgdbdshsghsgh",
      name: "Janelle Patton",
      isFollowed: true,
      username: "janellepatton",
      avatarDefinition: { skinColor: "light", eyes: "eyes_1", eyeColor: "darkBrown", expression: "expression_1", hair: "hair_1", hairColor: "darkBrown", clothing: "shirt_1", backgroundColor: "lightGray" },
    },
    {
      id: "sghsgdshdhhsdhsd",
      name: "Ashlyn Owens",
      isFollowed: true,
      username: "ashlynowens",
      avatarDefinition: { skinColor: "light", eyes: "eyes_1", eyeColor: "darkBrown", expression: "expression_1", hair: "hair_1", hairColor: "darkBrown", clothing: "shirt_1", backgroundColor: "lightGray" },
    },
    {
      id: "fsaklnkjdsafdasf",
      name: "Alma Gross",
      isFollowed: true,
      username: "almagross",
      avatarDefinition: { skinColor: "light", eyes: "eyes_1", eyeColor: "darkBrown", expression: "expression_1", hair: "hair_1", hairColor: "darkBrown", clothing: "shirt_1", backgroundColor: "lightGray" },
    },
    {
      id: "daggfafgfafddsaf",
      name: "Tina Harris",
      isFollowed: true,
      username: "tinaharris",
      avatarDefinition: { skinColor: "light", eyes: "eyes_1", eyeColor: "darkBrown", expression: "expression_1", hair: "hair_1", hairColor: "darkBrown", clothing: "shirt_1", backgroundColor: "lightGray" },
    },
    {
      id: "fsdaffgbnhdnff",
      name: "Susan Moran",
      isFollowed: true,
      username: "susanmoran",
      avatarDefinition: { skinColor: "light", eyes: "eyes_1", eyeColor: "darkBrown", expression: "expression_1", hair: "hair_1", hairColor: "darkBrown", clothing: "shirt_1", backgroundColor: "lightGray" },
    },
    {
      id: "ngsgdbdshsghsgh",
      name: "Mackenzie Lawrence",
      isFollowed: true,
      username: "mackenzielawrence",
      avatarDefinition: { skinColor: "light", eyes: "eyes_1", eyeColor: "darkBrown", expression: "expression_1", hair: "hair_1", hairColor: "darkBrown", clothing: "shirt_1", backgroundColor: "lightGray" },
    },
    {
      id: "sghsgdshdhhsdhsd",
      name: "Sara Pham",
      isFollowed: true,
      username: "sarapham",
      avatarDefinition: { skinColor: "light", eyes: "eyes_1", eyeColor: "darkBrown", expression: "expression_1", hair: "hair_1", hairColor: "darkBrown", clothing: "shirt_1", backgroundColor: "lightGray" },
    },
  ],
};

export const mockUsersListProps = {
  base,
};
