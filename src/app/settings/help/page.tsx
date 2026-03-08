"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { SETTINGS_HELP_ARTICLES, SETTINGS_HELP_SECTIONS } from "./content";

const SettingsHelpPage: React.FC = () => {
  const { t } = useTranslation("help");
  const navigateWithTransition = useTransitionNavigationHandler();

  return (
    <PageRoot data-test="settings-help-page">
      <BasicNavbar
        header={t("title")}
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
        <Stack spacing={6} width="100%">
          {SETTINGS_HELP_SECTIONS.map((section) => (
            <Stack key={section.id} spacing={2}>
              <Typography variant="h6">{t(section.titleKey)}</Typography>
              <Stack spacing={1}>
                {section.articleIds.map((articleId) => {
                  const article = SETTINGS_HELP_ARTICLES.find(
                    (candidateArticle) => candidateArticle.id === articleId,
                  );

                  if (!article) {
                    return null;
                  }

                  return (
                    <Box
                      key={article.id}
                      role="button"
                      tabIndex={0}
                      onClick={navigateWithTransition(
                        `/settings/help/${article.id}`,
                      )}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          navigateWithTransition(
                            `/settings/help/${article.id}`,
                          )();
                        }
                      }}
                      sx={{ py: 1, cursor: "pointer" }}
                    >
                      <Typography variant="body1">
                        {t(article.titleKey)}
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default SettingsHelpPage;
