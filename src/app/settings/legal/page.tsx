"use client";

import { ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BackNavbar from "components/navigation/BackNavbar/BackNavbar";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { SETTINGS_LEGAL_ARTICLES } from "./content";

const SettingsLegalPage: React.FC = () => {
  const { t } = useTranslation("legal");
  const navigateWithTransition = useTransitionNavigationHandler();

  return (
    <PageRoot data-test="settings-legal-page">
      <PageNavigation
        topNavigation={
          <BackNavbar withTransition route="/settings" header={t("title")} />
        }
        mainNavigation="hidden"
      />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="small"
        spacing={8}
      >
        {SETTINGS_LEGAL_ARTICLES.map((article) => (
          <Box
            key={article.id}
            role="button"
            tabIndex={0}
            onClick={navigateWithTransition(`/settings/legal/${article.id}`)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                navigateWithTransition(`/settings/legal/${article.id}`)();
              }
            }}
            sx={{ py: 1, cursor: "pointer" }}
          >
            <Typography variant="subtitle1">{t(article.titleKey)}</Typography>
          </Box>
        ))}
      </ContentContainer>
    </PageRoot>
  );
};

export default SettingsLegalPage;
