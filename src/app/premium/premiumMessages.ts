export const PREMIUM_MESSAGES = {
  queryParam: "message",
  default: "default",
  noEnergyLeft: "no-energy-left",
  certificateLocked: "certificate-locked",
  courseLocked: "course-locked",
  learningPathLocked: "learning-path-locked",
} as const;

export type PremiumMessageValue =
  (typeof PREMIUM_MESSAGES)[Exclude<keyof typeof PREMIUM_MESSAGES, "queryParam">];

export const getPremiumRoute = (message?: PremiumMessageValue): string => {
  if (!message || message === PREMIUM_MESSAGES.default) {
    return "/premium";
  }

  return `/premium?${PREMIUM_MESSAGES.queryParam}=${message}`;
};
