import type { ICareerPathCard } from "./CareerPathCard";

export const mockCareerPathCardProps: {
  default: ICareerPathCard;
  enrolled: ICareerPathCard;
} = {
  default: {
    title: "HTML Developer",
    subtitle: "Career Path",
    enrolled: false,
  },
  enrolled: {
    title: "HTML Developer",
    subtitle: "Career Path",
    enrolled: true,
    progress: 40,
  },
};
