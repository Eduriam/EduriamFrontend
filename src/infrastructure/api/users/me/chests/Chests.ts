export type OpenChestPayload =
  | {
      open: true;
      doubleReward?: never;
    }
  | {
      open: true;
      doubleReward: true;
    };
