import { Modify } from "domain/models/utils/modify";

import API, { FetchHook } from "infrastructure/api/API";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";

import { CreateSubscriptionResponseDTO, Subscription } from "./Subscriptions";

export interface SubscriptionParams {}

const SubscriptionAPI = {
  URI: "users/me/subscriptions",

  useSubscription(): Modify<
    FetchHook<Subscription>,
    { subscription: Subscription }
  > {
    const { data, ...rest } = useAuthenticatedAPI<Subscription>(`${this.URI}`);
    return { subscription: data, ...rest };
  },

  async createSubscription(): Promise<CreateSubscriptionResponseDTO> {
    return API.post(`${this.URI}`, {});
  },

  async cancelSubscription(value: {
    unsubscribeReason: string;
  }): Promise<Subscription> {
    return API.delete(`${this.URI}`, { data: value });
  },

  async startFreeTrial(): Promise<void> {
    return API.post(`${this.URI}/trial`, {});
  },
};

export default SubscriptionAPI;


