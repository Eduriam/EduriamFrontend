import { AvatarDefinition } from "components/avatar/Avatar";

import { Reaction } from "./reactions/Reactions";

export type FeedItem = FeedMessage;

export interface FeedMessage {
  id: Id;
  seenByUser?: boolean;
  author: string;
  avatarDefinition: AvatarDefinition;
  message: MessageType;
  reactions: Array<Reaction>;
  publishedAt: Date;
}

export type MessageType =
  | "reached_level_10"
  | "reached_level_50"
  | "reached_level_100";
