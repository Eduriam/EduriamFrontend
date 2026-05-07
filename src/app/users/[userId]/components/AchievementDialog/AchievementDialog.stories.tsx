import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AchievementType } from "infrastructure/api/generated/models";

import AchievementDialog, {
  type AchievementDialogProps,
} from "./AchievementDialog";

export default {
  title: "pages/users/[userId]/AchievementDialog",
  component: AchievementDialog,
} as ComponentMeta<typeof AchievementDialog>;

const Template: ComponentStory<typeof AchievementDialog> = (args) => (
  <AchievementDialog {...args} />
);

const baseAchievement = {
  userAchievementId: 1,
  achievementId: 1001,
  type: AchievementType.LessonCompletions,
  achievementMaxLevel: 10,
  achievedAt: "2026-05-07T00:00:00.000Z",
};

export const NotAchieved = Template.bind({});
NotAchieved.args = {
  open: true,
  isOwnProfile: true,
  onClose: () => undefined,
  userName: "User Name",
  achievement: {
    ...baseAchievement,
    currentLevel: 0,
    achievedAt: null,
    goal: 10,
    nextLevelGoal: 10,
  },
} as AchievementDialogProps;

export const InProgress = Template.bind({});
InProgress.args = {
  open: true,
  isOwnProfile: true,
  onClose: () => undefined,
  userName: "User Name",
  achievement: {
    ...baseAchievement,
    currentLevel: 1,
    goal: 10,
    nextLevelGoal: 50,
  },
} as AchievementDialogProps;

export const CompletedAllLevels = Template.bind({});
CompletedAllLevels.args = {
  open: true,
  isOwnProfile: true,
  onClose: () => undefined,
  userName: "User Name",
  achievement: {
    ...baseAchievement,
    currentLevel: 10,
    goal: 1000,
    nextLevelGoal: null,
  },
} as AchievementDialogProps;

export const OtherUserNotAchieved = Template.bind({});
OtherUserNotAchieved.args = {
  open: true,
  isOwnProfile: false,
  onClose: () => undefined,
  userName: "User Name",
  achievement: {
    ...baseAchievement,
    currentLevel: 0,
    achievedAt: null,
    goal: 10,
    nextLevelGoal: 10,
  },
} as AchievementDialogProps;

export const OtherUserAchieved = Template.bind({});
OtherUserAchieved.args = {
  open: true,
  isOwnProfile: false,
  onClose: () => undefined,
  userName: "User Name",
  achievement: {
    ...baseAchievement,
    currentLevel: 7,
    goal: 250,
    nextLevelGoal: 500,
  },
} as AchievementDialogProps;
