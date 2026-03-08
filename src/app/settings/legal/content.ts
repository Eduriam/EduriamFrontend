export interface SettingsLegalArticle {
  id: "terms" | "privacy";
  titleKey: string;
  bodyKey: string;
}

export const SETTINGS_LEGAL_ARTICLES: SettingsLegalArticle[] = [
  {
    id: "terms",
    titleKey: "articles.terms.title",
    bodyKey: "articles.terms.body",
  },
  {
    id: "privacy",
    titleKey: "articles.privacy.title",
    bodyKey: "articles.privacy.body",
  },
];

export function getSettingsLegalArticle(articleId: string) {
  return SETTINGS_LEGAL_ARTICLES.find((article) => article.id === articleId);
}
