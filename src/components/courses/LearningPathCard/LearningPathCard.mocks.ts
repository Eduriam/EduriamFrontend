import type { ILearningPathCard } from "./LearningPathCard";

export const mockLearningPathCardProps: {
  default: ILearningPathCard;
  enrolled: ILearningPathCard;
} = {
  default: {
    title: "HTML Developer",
    subtitle: "Learning Path",
    enrolled: false,
  },
  enrolled: {
    title: "HTML Developer",
    subtitle: "Learning Path",
    enrolled: true,
    progress: 40,
  },
};
