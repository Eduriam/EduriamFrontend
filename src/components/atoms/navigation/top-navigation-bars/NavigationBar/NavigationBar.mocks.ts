import { INavigationBar } from "./NavigationBar";

const primary: INavigationBar = {
  header: "Header",
  leftIconButton: {
    icon: "chevronLeft",
  },
  rightIconButton: {
    icon: "chevronRight",
  },
};

const transparent: INavigationBar = {
  header: "Header",
  leftIconButton: {
    icon: "chevronLeft",
  },
  rightIconButton: {
    icon: "chevronRight",
  },
};

export const mockNavigationBarProps = {
  primary,
  transparent,
};
