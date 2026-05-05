import { Icon, Illustration } from "@eduriam/ui-core";

import { type ReactNode, useState } from "react";

import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

import { primaryNavigation } from "components/navigation/config";

import useAuth from "infrastructure/services/AuthProvider";

import { useTranslation } from "../../../../../i18n/client";

export interface ISideNavigationBar {
  pathname: string;
}

type NavigationItem = {
  icon: ReactNode;
  label: string;
  path: string;
};

export const SIDE_NAV_BAR_WIDTH = 90;
const SIDE_NAV_BAR_EXPANDED_WIDTH = 252;
const NAV_ICON_LEFT_PADDING = "12px";
const BRAND_ICON_LEFT_PADDING = "17px";
const SIDE_CONTENT_PADDING_X = "12px";

const utilityNavigation: NavigationItem[] = [
  {
    icon: <Icon name="studyPlan" />,
    label: "navigation.studyPlan",
    path: "/study-plan",
  },
  {
    icon: <Icon name="courses" />,
    label: "navigation.courses",
    path: "/courses",
  },
  {
    icon: <Icon name="shop" />,
    label: "navigation.shop",
    path: "/shop",
  },
];

const settingsNavigation: NavigationItem = {
  icon: <Icon name="settings" />,
  label: "navigation.settings",
  path: "/settings",
};

const isActivePath = (itemPath: string, pathname: string): boolean => {
  if (itemPath === "/") {
    return pathname === "/";
  }

  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
};

const SideNavigationBar: React.FC<ISideNavigationBar> = ({ pathname }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation("common");
  const router = useRouter();
  const { user } = useAuth();

  const normalizedPathname = /^\/users\/[^/]+$/.test(pathname)
    ? "/profile"
    : pathname;

  const mainNavigation: NavigationItem[] = primaryNavigation.map((item) => ({
    icon: item.icon,
    label: item.label,
    path: item.path,
  }));

  const handleNavigation = (itemPath: string) => {
    if (itemPath === "/profile") {
      if (user?.id) {
        router.push(`/users/${user.id}`);
      }

      return;
    }

    router.push(itemPath);
  };

  const getLabel = (labelKey: string) => {
    const localized = t(labelKey);
    return typeof localized === "string" ? localized : labelKey;
  };

  const renderNavItem = (item: NavigationItem) => {
    const active = isActivePath(item.path, normalizedPathname);
    const label = getLabel(item.label);

    return (
      <Box
        key={item.path}
        component="button"
        aria-label={label}
        onClick={() => handleNavigation(item.path)}
        sx={(theme) => ({
          width: "100%",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          pl: NAV_ICON_LEFT_PADDING,
          pr: isExpanded ? 2 : 0,
          border: "none",
          borderRadius: "14px",
          backgroundColor: active
            ? alpha(theme.palette.primary.main, 0.14)
            : "transparent",
          color: active ? "primary.main" : "text.primary",
          cursor: "pointer",
          transition: theme.transitions.create(["background-color", "color"], {
            duration: theme.transitions.duration.shorter,
          }),
          "&:hover": {
            backgroundColor: active
              ? alpha(theme.palette.primary.main, 0.18)
              : alpha(theme.palette.text.primary, 0.06),
          },
          "&:focus-visible": {
            outline: `2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
            outlineOffset: 2,
          },
        })}
      >
        <Box
          sx={{
            width: 40,
            minWidth: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& svg": {
              fontSize: 28,
            },
          }}
        >
          {item.icon}
        </Box>

        <Typography
          variant="body1"
          fontWeight={active ? 700 : 500}
          sx={(theme) => ({
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            ml: isExpanded ? 1.5 : 0,
            maxWidth: isExpanded ? 170 : 0,
            opacity: isExpanded ? 1 : 0,
            transition: theme.transitions.create(
              ["opacity", "max-width", "margin-left"],
              {
                duration: theme.transitions.duration.shorter,
              },
            ),
          })}
        >
          {label}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      sx={(theme) => ({
        height: "100%",
        width: isExpanded
          ? `${SIDE_NAV_BAR_EXPANDED_WIDTH}px`
          : `${SIDE_NAV_BAR_WIDTH}px`,
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: theme.zIndex.appBar,
        backgroundColor: "background.default",
        borderRight: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        overflow: "hidden",
        transition: theme.transitions.create("width", {
          duration: theme.transitions.duration.shorter,
        }),
      })}
    >
      <Stack sx={{ height: "100%" }}>
        <Box sx={{ px: SIDE_CONTENT_PADDING_X, pt: 2.5, pb: 2 }}>
          <Box
            component="button"
            type="button"
            aria-label={getLabel("navigation.home")}
            onClick={() => router.push("/")}
            sx={(theme) => ({
              height: 56,
              width: "100%",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              pl: BRAND_ICON_LEFT_PADDING,
              pr: isExpanded ? 2 : 0,
              border: "none",
              backgroundColor: "transparent",
              color: "text.primary",
              cursor: "pointer",
              transition: theme.transitions.create("background", {
                duration: theme.transitions.duration.shorter,
              }),
              "&:focus-visible": {
                outline: `2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                outlineOffset: 2,
              },
            })}
          >
            <Illustration name="eduriam-logo" width={32} height={32} />
            <Typography
              variant="h6"
              fontWeight={700}
              sx={(theme) => ({
                color: "text.primary",
                ml: isExpanded ? 3 : 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: isExpanded ? 160 : 0,
                opacity: isExpanded ? 1 : 0,
                transition: theme.transitions.create(
                  ["opacity", "max-width", "margin-left"],
                  {
                    duration: theme.transitions.duration.shorter,
                  },
                ),
              })}
            >
              {getLabel("navigation.eduriamTitle")}
            </Typography>
          </Box>
        </Box>

        <Stack spacing={0.5} sx={{ px: SIDE_CONTENT_PADDING_X }}>
          {mainNavigation.map(renderNavItem)}
        </Stack>

        <Divider sx={{ mx: "16px", my: 2 }} />

        <Stack spacing={0.5} sx={{ px: SIDE_CONTENT_PADDING_X }}>
          {utilityNavigation.map(renderNavItem)}
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ px: SIDE_CONTENT_PADDING_X, pb: 2 }}>
          {renderNavItem(settingsNavigation)}
        </Box>
      </Stack>
    </Box>
  );
};

export default SideNavigationBar;
