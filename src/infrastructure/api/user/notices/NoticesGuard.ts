import {
  AchievementNotice,
  AdvertisementNotice,
  FreeTrialEndNotice,
  FreeTrialOfferNotice,
  Notice,
  RatingSurveyNotice,
  RewardNotice,
  StudyStatsNotice,
} from "./Notices";

export function isAchievementNotice(
  notice: Notice,
): notice is AchievementNotice {
  return (notice as AchievementNotice).type === "ACHIEVEMENT";
}

export function isFreeTrialEndNotice(
  notice: Notice,
): notice is FreeTrialEndNotice {
  return (notice as FreeTrialEndNotice).type === "FREE_TRIAL_END";
}

export function isRatingSurveyNotice(
  notice: Notice,
): notice is RatingSurveyNotice {
  return (notice as RatingSurveyNotice).type === "RATING_SURVEY";
}

export function isRewardNotice(notice: Notice): notice is RewardNotice {
  return (notice as RewardNotice).type === "REWARD";
}

export function isAdvertisementNotice(
  notice: Notice,
): notice is AdvertisementNotice {
  return (notice as AdvertisementNotice).type === "ADVERTISEMENT";
}

export function isStudyStatsNotice(notice: Notice): notice is StudyStatsNotice {
  return (notice as StudyStatsNotice).type === "STUDY_STATS";
}

export function isFreeTrialOfferNotice(
  notice: Notice,
): notice is FreeTrialOfferNotice {
  return (notice as FreeTrialOfferNotice).type === "FREE_TRIAL_OFFER";
}
