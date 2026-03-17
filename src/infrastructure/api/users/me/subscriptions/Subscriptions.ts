export interface Subscription {
  currentPeriodEnd: Date;
  status:
    | "TRIALING"
    | "INCOMPLETE"
    | "INCOMPLETE_EXPIRED"
    | "ACTIVE"
    | "PAST_DUE"
    | "SCHEDULED_TO_CANCEL"
    | "CANCELED"
    | "UNPAID"
    | "PAUSED";
}

export interface CreateSubscriptionResponseDTO {
  type: "setup" | "payment";
  clientSecret: string | null;
}
