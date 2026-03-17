import API from "infrastructure/api/API";

import { ReactionId } from "./Reactions";

export interface ReactionParams {}

const ReactionsAPI = {
  URI: (feedItemId: Id) => `users/me/feed/${feedItemId}/reactions`,

  async addReaction(feedItemId: Id, reactionId: ReactionId): Promise<void> {
    return API.put(`${this.URI(feedItemId)}/${reactionId}`, {});
  },

  async deleteReaction(feedItemId: Id, reactionId: ReactionId): Promise<void> {
    return API.delete(`${this.URI(feedItemId)}/${reactionId}`);
  },
};

export default ReactionsAPI;
