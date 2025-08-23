import config from "config/config";
import { useTranslation } from "i18n/client";
import theme from "styles/theme";

import { usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";

import useAuth from "infrastructure/services/AuthProvider";

import DrawerContainer from "../drawer/DrawerContainer/DrawerContainer";
import BottomNavigationBar from "../main-navigation-bars/BottomNavigationBar/BottomNavigationBar";
import SideNavigationBar from "../main-navigation-bars/SideNavigationBar/SideNavigationBar";
import BackNavigationBar from "../top-navigation-bars/BackNavigationBar/BackNavigationBar";
import DefaultNavigationBar from "../top-navigation-bars/DefaultNavigationBar/DefaultNavigationBar";
import HomeNavigationBar from "../top-navigation-bars/HomeNavigationBar/HomeNavigationBar";
import LessonsNavigationBar from "../top-navigation-bars/LessonsNavigationBar/LessonsNavigationBar";
import ShopNavigationBar from "../top-navigation-bars/ShopNavigationBar/ShopNavigationBar";

export interface INavigation {}

const Navigation: React.FC<INavigation> = () => {
  const { user } = useAuth();
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  function renderTopNavBar(pathname: string) {
    if (/\/users\/.*\/followers/.test(pathname)) {
      return <BackNavigationBar />;
    }
    if (/^\/help\//.test(pathname)) {
      return <BackNavigationBar header="help" />;
    }
    if (/^\/help/.test(pathname)) {
      return (
        <DrawerContainer
          child={{
            component: DefaultNavigationBar,
            props: { header: t("navigation.help") },
          }}
        />
      );
    }
    if (/^\/lesson-items\//.test(pathname)) {
      if (desktop) {
        return <BackNavigationBar />;
      } else {
        return <BackNavigationBar color="transparent" />;
      }
    }
    if (/^\/lessons\//.test(pathname)) {
      if (desktop) {
        return <BackNavigationBar />;
      } else {
        return <BackNavigationBar color="transparent" />;
      }
    }

    switch (pathname) {
      case "/login":
        return <></>;
      case "/signup":
        return <></>;
      case "/change-password":
        return <></>;
      case "/forgot-password":
        return <BackNavigationBar color="transparent" />;
      case "/change-email":
        return <></>;
      case "/change-email-request":
        return <BackNavigationBar />;
      case "/lessons":
        return <DrawerContainer child={{ component: LessonsNavigationBar }} />;
      case "/shop":
        return <DrawerContainer child={{ component: ShopNavigationBar }} />;
      case "/":
        return <DrawerContainer child={{ component: HomeNavigationBar }} />;
      case "/manage-subscription":
        return <BackNavigationBar header="manageSubscription" />;
      case "/lessons-create":
        return <BackNavigationBar />;
      case "/favorites":
        return (
          <DrawerContainer
            child={{
              component: DefaultNavigationBar,
              props: {
                header: t("navigation.favorites"),
              },
            }}
          />
        );
      case "/topic-selection":
        return <BackNavigationBar header="topicSelection" />;
      case "/settings":
        return (
          <DrawerContainer
            child={{
              component: DefaultNavigationBar,
              props: {
                header: t("navigation.settings"),
              },
            }}
          />
        );
      case "/challenges":
        return (
          <DrawerContainer
            child={{
              component: DefaultNavigationBar,
              props: {
                header: t("navigation.challenges"),
              },
            }}
          />
        );
      case "/feed":
        return (
          <DrawerContainer
            child={{
              component: DefaultNavigationBar,
              props: {
                header: t("navigation.feed"),
              },
            }}
          />
        );
      case "/subscribed":
        return <></>;
      default: {
        if (user) {
          return (
            <DrawerContainer child={{ component: DefaultNavigationBar }} />
          );
        } else {
          return <></>;
        }
      }
    }
  }

  function renderMainNavBar(pathname: string) {
    if (!user) {
      return <></>;
    }

    if (pathname === "/subscribed") {
      return <></>;
    }

    if (desktop === true) {
      return <SideNavigationBar pathname={pathname} />;
    } else {
      return <BottomNavigationBar pathname={pathname} />;
    }
  }

  return (
    <>
      {pathname && !config.pagesWithoutToolbar.includes(pathname) && (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          {renderTopNavBar(pathname)}
          {renderMainNavBar(pathname)}
        </Box>
      )}

      {pathname !== "/study" ? <Toolbar /> : <></>}
    </>
  );
};

export default Navigation;
