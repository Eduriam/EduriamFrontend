export interface Reaction {
  id: ReactionId;
  counter: number;
  reactedByUser: boolean;
}

export type ReactionId =
  | "confetti"
  | "heart"
  | "muscle"
  | "clappingHands"
  | "sunglasses";
