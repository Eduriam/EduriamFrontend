import type { IHomepageNavbar } from "./HomepageNavbar";

const noop = () => {
  // Intentionally empty mock implementation
};

export const mockHomepageNavbarProps: IHomepageNavbar = {
  streak: 1247,
  coins: 24000,
  energy: 12,
  onStudyPlanClick: noop,
};
