"use client";

import theme from "styles/theme";

import { ReactNode } from "react";

import { usePathname } from "next/navigation";

import GlobalStyles from "@mui/material/GlobalStyles";
import useMediaQuery from "@mui/material/useMediaQuery";

import BottomNavigationBar, {
  BOTTOM_NAV_BAR_HEIGHT,
} from "../../atoms/navigation/main-navigation-bars/BottomNavigationBar/BottomNavigationBar";
import SideNavigationBar from "../../atoms/navigation/main-navigation-bars/SideNavigationBar/SideNavigationBar";

export interface IPageNavigation {
  topNavigation: ReactNode | "hidden";
  mainNavigation: "show" | "hidden" | "desktopOnly";
}

const PageNavigation: React.FC<IPageNavigation> = ({
  topNavigation = "hidden",
  mainNavigation = "show",
}) => {
  const pathname = usePathname();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const hasPathname = Boolean(pathname);
  const shouldShowSideNavigation =
    hasPathname && desktop && mainNavigation !== "hidden";
  const shouldShowBottomNavigation =
    hasPathname && !desktop && mainNavigation === "show";

  function renderPrimaryNavigation() {
    if (shouldShowSideNavigation) {
      return <SideNavigationBar pathname={pathname} />;
    }

    if (shouldShowBottomNavigation) {
      return <BottomNavigationBar pathname={pathname} />;
    }

    return null;
  }

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            paddingBottom: shouldShowBottomNavigation
              ? `${BOTTOM_NAV_BAR_HEIGHT}px`
              : undefined,
          },
        }}
      />
      {topNavigation === "hidden" ? null : topNavigation}
      {renderPrimaryNavigation()}
    </>
  );
};

export default PageNavigation;
