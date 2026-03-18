"use client";

import {
  BasicNavbar,
  ContentContainer,
  Icon,
  PageRoot,
} from "@eduriam/ui-core";
import { ReportDialog } from "@eduriam/ui-x";
import {
  SETTINGS_REPORT_DATA_TEST,
  createSettingsReportLocalization,
  createSettingsReportProblemTypeSections,
} from "app/settings/config/settingsReportConfig";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { ReactNode, useMemo, useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import ReportsAPI from "infrastructure/api/reports/ReportsAPI";
import useAuth from "infrastructure/services/AuthProvider";

type SettingsMenuItem = {
  id: string;
  label: string;
  icon: ReactNode;
  dataTest: string;
  onClick: () => void;
};

const SettingsPage: React.FC = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
  const { signout } = useAuth();

  const [isReportOpen, setIsReportOpen] = useState(false);

  const reportLocalization = createSettingsReportLocalization(t);
  const reportProblemTypeSections = useMemo(
    () => createSettingsReportProblemTypeSections(t),
    [t],
  );

  const accountItems: SettingsMenuItem[] = [
    {
      id: "profile",
      label: t("settings.items.profile"),
      icon: <Icon name="account" />,
      dataTest: "profile-settings-button",
      onClick: navigateWithTransition("/settings/profile"),
    },
    {
      id: "preferences",
      label: t("settings.items.preferences"),
      icon: <Icon name="preferences" />,
      dataTest: "preferences-settings-button",
      onClick: navigateWithTransition("/settings/preferences"),
    },
    {
      id: "notifications",
      label: t("settings.items.notifications"),
      icon: <Icon name="notification" />,
      dataTest: "notifications-settings-button",
      onClick: navigateWithTransition("/settings/notifications"),
    },
    {
      id: "courses",
      label: t("settings.items.courses"),
      icon: <Icon name="courses" />,
      dataTest: "courses-settings-button",
      onClick: navigateWithTransition("/settings/courses"),
    },
  ];

  const supportItems: SettingsMenuItem[] = [
    {
      id: "help",
      label: t("settings.items.help"),
      icon: <Icon name="help" />,
      dataTest: "help-settings-button",
      onClick: navigateWithTransition("/settings/help"),
    },
    {
      id: "report",
      label: t("settings.items.reportAProblem"),
      icon: <Icon name="report" />,
      dataTest: "report-settings-button",
      onClick: () => setIsReportOpen(true),
    },
  ];

  const otherItems: SettingsMenuItem[] = [
    {
      id: "signout",
      label: t("settings.items.signout"),
      icon: <Icon name="logout" />,
      dataTest: "signout-settings-button",
      onClick: () => signout(),
    },
    {
      id: "legal",
      label: t("settings.items.legal"),
      icon: <Icon name="legal" />,
      dataTest: "legal-settings-button",
      onClick: navigateWithTransition("/settings/legal"),
    },
  ];

  const renderSection = (items: SettingsMenuItem[]) => (
    <Stack spacing={5} width="100%">
      {items.map((item) => (
        <Box
          key={item.id}
          role="button"
          tabIndex={0}
          data-test={item.dataTest}
          onClick={item.onClick}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              item.onClick();
            }
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            py: 1,
            cursor: "pointer",
          }}
        >
          <Box sx={{ display: "flex", color: "text.primary" }}>{item.icon}</Box>
          <Typography variant="body1" sx={{ flex: 1 }}>
            {item.label}
          </Typography>
          <ChevronRightIcon
            sx={{
              color: "text.secondary",
              fontSize: 20,
              display: { xs: "none", md: "block" },
            }}
          />
        </Box>
      ))}
    </Stack>
  );

  return (
    <PageRoot data-test="settings-page">
      <PageNavigation
        topNavigation={
          <BasicNavbar
            header={t("settings.title")}
            leftButton={{
              icon: "arrowLeft",
              onClick: navigateWithTransition("/", { direction: "back" }),
            }}
          />
        }
        mainNavigation="desktopOnly"
      />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="small"
      >
        <Stack spacing={8} width="100%">
          {renderSection(accountItems)}
          <Divider />
          {renderSection(supportItems)}
          <Divider />
          {renderSection(otherItems)}
        </Stack>
      </ContentContainer>

      <ReportDialog
        open={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onSubmit={async (payload) => {
          await ReportsAPI.submitReport({
            type: "GENERAL",
            problemTypeId: payload.problemTypeId,
            description: payload.description,
          });
        }}
        problemTypeSections={reportProblemTypeSections}
        localization={reportLocalization}
        dataTest={SETTINGS_REPORT_DATA_TEST}
      />
    </PageRoot>
  );
};

export default SettingsPage;
