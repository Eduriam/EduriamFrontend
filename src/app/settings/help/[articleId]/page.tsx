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

import { getSettingsHelpArticle } from "../content";

export interface ISettingsHelpArticlePage {
  params: {
    articleId: string;
  };
}

const SettingsHelpArticlePage: React.FC<ISettingsHelpArticlePage> = ({
  params,
}) => {
  const { t } = useTranslation("help");
  const navigateWithTransition = useTransitionNavigationHandler();
  const article = getSettingsHelpArticle(params.articleId);

  return (
    <PageRoot data-test="settings-help-article-page">
      <BasicNavbar
        leftButton={{
          icon: "arrowLeft",
          onClick: navigateWithTransition("/settings/help", {
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
          <Header
            variant="section"
            text={
              article ? t(article.titleKey) : t("notFoundTitle")
            }
          />
          <Typography variant="body1" color="text.secondary">
            {article ? t(article.bodyKey) : t("notFoundDescription")}
          </Typography>
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default SettingsHelpArticlePage;
