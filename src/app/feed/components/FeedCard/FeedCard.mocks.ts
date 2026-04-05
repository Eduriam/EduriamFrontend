import { action } from "@storybook/addon-actions";

import { IFeedCard } from "./FeedCard";

const base: IFeedCard = {
  onAddReaction: action("onAddReaction"),
  onRemoveReaction: action("onRemoveReaction"),
  feedMessage: {
    id: 1,
    author: "Pepa Okurka",
    avatarDefinition: {
      skinColor: "light",
      eyes: "eyes_1",
      eyeColor: "brown",
      expression: "expression_1",
      hair: "hair_1",
      hairColor: "mediumBrown",
      clothing: "shirt_1",
      backgroundColor: "lightGray",
    },
    message: "streak_milestone",
    streak: 120,
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    reactions: [
      {
        counter: 12,
        reactedByUser: true,
        id: "heart",
      },
      {
        counter: 12,
        reactedByUser: false,
        id: "muscle",
      },
      {
        counter: 12,
        reactedByUser: false,
        id: "confetti",
      },
    ],
  },
};

export const mockFeedCardProps = {
  base,
};
