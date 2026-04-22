"use client";

import {
  ContentContainer,
  Header,
  PageRoot,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Typography from "@mui/material/Typography";
import BackNavbar from "components/navigation/BackNavbar/BackNavbar";
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
  const article = getSettingsHelpArticle(params.articleId);

  return (
    <PageRoot data-test="settings-help-article-page">
      <PageNavigation
        topNavigation={<BackNavbar withTransition route="/settings/help" />}
        mainNavigation="hidden"
      />

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
