"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const SettingsLegalPage: React.FC = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();

  return (
    <PageRoot data-test="settings-legal-page">
      <BasicNavbar
        header={t("settings.items.legal")}
        leftButton={{
          icon: "arrowLeft",
          onClick: navigateWithTransition("/settings", { direction: "back" }),
        }}
      />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="none"
      >
        <Stack spacing={1} width="100%">
          <Box
            role="button"
            tabIndex={0}
            onClick={navigateWithTransition("/settings/legal/terms")}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                navigateWithTransition("/settings/legal/terms")();
              }
            }}
            sx={{ py: 1, cursor: "pointer" }}
          >
            <Typography variant="body1">
              {t("settings.legal.termsTitle")}
            </Typography>
          </Box>
          <Box
            role="button"
            tabIndex={0}
            onClick={navigateWithTransition("/settings/legal/privacy")}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                navigateWithTransition("/settings/legal/privacy")();
              }
            }}
            sx={{ py: 1, cursor: "pointer" }}
          >
            <Typography variant="body1">
              {t("settings.legal.privacyTitle")}
            </Typography>
          </Box>
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default SettingsLegalPage;
