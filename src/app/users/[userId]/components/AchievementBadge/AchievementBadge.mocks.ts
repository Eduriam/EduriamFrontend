import { IAchievementBadge } from "./AchievementBadge";

const base: IAchievementBadge = {
  completed: true,
  badgeIconName: "achievement-1",
};

const disabled: IAchievementBadge = {
  completed: false,
  badgeIconName: "achievement-1",
};

const withText: IAchievementBadge = {
  completed: true,
  badgeIconName: "achievement-2",
  showText: true,
  name: "Achievement Name",
};

const withTextDisabled: IAchievementBadge = {
  completed: false,
  badgeIconName: "achievement-2",
  showText: true,
  name: "Achievement Name",
};

export const mockAchievementBadgeProps = {
  base,
  disabled,
  withText,
  withTextDisabled,
};
