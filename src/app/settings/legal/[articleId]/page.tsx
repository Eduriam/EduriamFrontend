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
  const navigateWithTransition = useTransitionNavigationHandler();
  const article = getSettingsLegalArticle(params.articleId);

  return (
    <PageRoot data-test="settings-legal-article-page">
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
