"use client";

import {
  BasicNavbar,
  ContentContainer,
  Header,
  PageRoot,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import Typography from "@mui/material/Typography";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

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
      <PageNavigation topNavigation={<BasicNavbar
        leftButton={{
          icon: "arrowLeft",
          onClick: navigateWithTransition("/settings/help", {
            direction: "back",
          }),
        }}
      />} mainNavigation="hidden" />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="none"
        spacing={4}
      >
        <Header
          variant="section"
          text={article ? t(article.titleKey) : t("notFoundTitle")}
        />
        <Typography variant="body1" color="text.secondary">
          {article ? t(article.bodyKey) : t("notFoundDescription")}
        </Typography>
      </ContentContainer>
    </PageRoot>
  );
};

export default SettingsHelpArticlePage;
