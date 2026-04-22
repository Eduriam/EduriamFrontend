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

import { getSettingsLegalArticle } from "../content";

export interface ISettingsLegalArticlePage {
  params: {
    articleId: string;
  };
}

const SettingsLegalArticlePage: React.FC<ISettingsLegalArticlePage> = ({
  params,
}) => {
  const { t } = useTranslation("legal");
  const article = getSettingsLegalArticle(params.articleId);

  return (
    <PageRoot data-test="settings-legal-article-page">
      <PageNavigation
        topNavigation={<BackNavbar withTransition route="/settings/legal" />}
        mainNavigation="hidden"
      />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="small"
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

export default SettingsLegalArticlePage;
