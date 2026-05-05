export interface SettingsHelpArticle {
  id: string;
  titleKey: string;
  bodyKey: string;
}

export interface SettingsHelpSection {
  id: string;
  titleKey: string;
  articleIds: string[];
}

export const SETTINGS_HELP_ARTICLES: SettingsHelpArticle[] = [
  {
    id: "what-is-a-streak",
    titleKey: "articles.whatIsAStreak.title",
    bodyKey: "articles.whatIsAStreak.body",
  },
  {
    id: "what-are-leagues-and-leaderboards",
    titleKey: "articles.whatAreLeaguesAndLeaderboards.title",
    bodyKey: "articles.whatAreLeaguesAndLeaderboards.body",
  },
  {
    id: "how-do-i-reset-course-progress",
    titleKey: "articles.howDoIResetCourseProgress.title",
    bodyKey: "articles.howDoIResetCourseProgress.body",
  },
  {
    id: "how-do-i-change-account-details",
    titleKey: "articles.howDoIChangeAccountDetails.title",
    bodyKey: "articles.howDoIChangeAccountDetails.body",
  },
  {
    id: "how-do-i-delete-my-account",
    titleKey: "articles.howDoIDeleteMyAccount.title",
    bodyKey: "articles.howDoIDeleteMyAccount.body",
  },
  {
    id: "what-is-eduriam-premium",
    titleKey: "articles.whatIsEduriamPremium.title",
    bodyKey: "articles.whatIsEduriamPremium.body",
  },
  {
    id: "how-can-i-cancel-eduriam-premium-subscription",
    titleKey: "articles.howCanICancelEduriamPremiumSubscription.title",
    bodyKey: "articles.howCanICancelEduriamPremiumSubscription.body",
  },
];

export const SETTINGS_HELP_SECTIONS: SettingsHelpSection[] = [
  {
    id: "using-eduriam",
    titleKey: "sections.usingEduriam",
    articleIds: [
      "what-is-a-streak",
      "what-are-leagues-and-leaderboards",
      "how-do-i-reset-course-progress",
    ],
  },
  {
    id: "account-management",
    titleKey: "sections.accountManagement",
    articleIds: [
      "how-do-i-change-account-details",
      "how-do-i-delete-my-account",
    ],
  },
  {
    id: "subscription-and-payments",
    titleKey: "sections.subscriptionAndPayments",
    articleIds: [
      "what-is-eduriam-premium",
      "how-can-i-cancel-eduriam-premium-subscription",
    ],
  },
];

export function getSettingsHelpArticle(articleId: string) {
  return SETTINGS_HELP_ARTICLES.find((article) => article.id === articleId);
}
