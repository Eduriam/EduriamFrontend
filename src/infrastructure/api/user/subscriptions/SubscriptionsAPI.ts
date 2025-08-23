import { Modify } from "domain/models/utils/modify";

import API, { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { CreateSubscriptionResponseDTO, Subscription } from "./Subscriptions";

export interface SubscriptionParams {}

const SubscriptionAPI = {
  URI: "user/subscription",

  useSubscription(): Modify<
    FetchHook<Subscription>,
    { subscription: Subscription }
  > {
    const { data, ...rest } = useAPI<Subscription>(`${this.URI}`);
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
