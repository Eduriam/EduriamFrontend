import API from "infrastructure/api/API";

export interface FollowingParams {}

const UserFollowingAPI = {
  URI: "users",

  async followUser(id: Id, userId: Id): Promise<void> {
    return API.put(`${this.URI}/${id}/following/${userId}`, {});
  },

  async unfollowUser(id: Id, userId: Id): Promise<void> {
    return API.delete(`${this.URI}/${id}/following/${userId}`);
  },
};

export default UserFollowingAPI;
