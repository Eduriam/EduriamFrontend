import { Modify } from "domain/models/utils/modify";

import { FetchHook } from "infrastructure/api/API";
import type {
  CancelSubscriptionModel,
  CreateSubscriptionRespModel,
  GetSubscriptionModel,
} from "infrastructure/api/generated/models";
import { getUsers } from "infrastructure/api/generated/users/users";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

const useSubscriptionQuery = (): Modify<
  FetchHook<GetSubscriptionModel>,
  { subscription: GetSubscriptionModel }
> => {
  const { data, ...rest } = useAuthenticatedAPI<GetSubscriptionModel>(
    "users/me/subscriptions/current",
    async () => SubscriptionsService.getSubscription(),
  );

  return { subscription: data, ...rest };
};

export const SubscriptionsService = {
  async getSubscription(): Promise<GetSubscriptionModel> {
    try {
      const response = await usersClient.getApiUsersMeSubscriptionsCurrent();
      if (!response.data) {
        throw new Error("Subscription response is empty.");
      }

      return response.data;
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async createSubscription(): Promise<CreateSubscriptionRespModel> {
    try {
      const response = await usersClient.postApiUsersMeSubscriptions();
      if (!response.data) {
        throw new Error("Create subscription response is empty.");
      }

      return response.data;
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async cancelSubscription(
    value: CancelSubscriptionModel,
  ): Promise<GetSubscriptionModel> {
    try {
      const response =
        await usersClient.postApiUsersMeSubscriptionsCurrentCancellation(value);
      if (!response.data) {
        throw new Error("Cancel subscription response is empty.");
      }

      return response.data;
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async startFreeTrial(): Promise<CreateSubscriptionRespModel> {
    try {
      const response = await usersClient.postApiUsersMeSubscriptionsTrial();
      if (!response.data) {
        throw new Error("Start free trial response is empty.");
      }

      return response.data;
    } catch (error) {
      return toErrorCode(error);
    }
  },

  useSubscription(): Modify<
    FetchHook<GetSubscriptionModel>,
    { subscription: GetSubscriptionModel }
  > {
    return useSubscriptionQuery();
  },
};
