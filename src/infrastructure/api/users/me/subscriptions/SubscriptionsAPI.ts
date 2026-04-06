import { Modify } from "domain/models/utils/modify";

import API, { FetchHook } from "infrastructure/api/API";
import type {
  CreateSubscriptionRespModel,
  GetSubscriptionModel,
} from "infrastructure/api/generated/models";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";

export interface SubscriptionParams {}

const SubscriptionAPI = {
  URI: "users/me/subscriptions",

  useSubscription(): Modify<
    FetchHook<GetSubscriptionModel>,
    { subscription: GetSubscriptionModel }
  > {
    const { data, ...rest } = useAuthenticatedAPI<GetSubscriptionModel>(
      `${this.URI}`,
    );
    return { subscription: data, ...rest };
  },

  async createSubscription(): Promise<CreateSubscriptionRespModel> {
    return API.post(`${this.URI}`, {});
  },

  async cancelSubscription(value: {
    unsubscribeReason: string;
  }): Promise<GetSubscriptionModel> {
    return API.delete(`${this.URI}`, { data: value });
  },

  async startFreeTrial(): Promise<CreateSubscriptionRespModel> {
    return API.post(`${this.URI}/trial`, {});
  },
};

export default SubscriptionAPI;
