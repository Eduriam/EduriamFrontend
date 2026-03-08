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
  mainNavigation: "show" | "hidden";
}

const PageNavigation: React.FC<IPageNavigation> = ({
  topNavigation = "hidden",
  mainNavigation = "show",
}) => {
  const pathname = usePathname();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const shouldShowPrimaryNavigation =
    mainNavigation === "show" && Boolean(pathname);

  function renderPrimaryNavigation() {
    if (!shouldShowPrimaryNavigation) {
      return null;
    }

    return desktop ? (
      <SideNavigationBar pathname={pathname} />
    ) : (
      <BottomNavigationBar pathname={pathname} />
    );
  }

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            paddingBottom:
              shouldShowPrimaryNavigation && !desktop
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
