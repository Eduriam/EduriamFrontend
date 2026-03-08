"use client";

import {
  BasicNavbar,
  ContentContainer,
  Header,
  PageRoot,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const SettingsLegalTermsPage: React.FC = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();

  return (
    <PageRoot data-test="settings-legal-terms-page">
      <BasicNavbar
        leftButton={{
          icon: "arrowLeft",
          onClick: navigateWithTransition("/settings/legal", {
            direction: "back",
          }),
        }}
      />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="none"
      >
        <Stack spacing={2} width="100%">
          <Header variant="section" text={t("settings.legal.termsTitle")} />
          <Typography variant="body1" color="text.secondary">
            {t("settings.legal.termsBody")}
          </Typography>
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default SettingsLegalTermsPage;
