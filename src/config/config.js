const config = {
  pagesWithToolbar: /** @type {Array<string | RegExp>} */ ([
    "/change-email-request",
    "/challenges",
    "/favorites",
    "/lessons",
    "/lessons-create",
    "/topic-selection",
    /^\/help(\/|$)/,
    /^\/lesson-items(\/|$)/,
    /^\/lessons(\/|$)/,
  ]),
  pagesWithoutContentContainer: ["/study"],
  termsAndConditionsUrl: "https://www.example.com",
  privacyPolicyUrl: "https://www.example.com",

  categories: [
    {
      id: "0",
      name: "levels.0",
    },
    {
      id: "1",
      name: "levels.1",
    },
    {
      id: "2",
      name: "levels.2",
    },
    {
      id: "3",
      name: "levels.3",
    },
    {
      id: "4",
      name: "levels.4",
    },
    {
      id: "5",
      name: "levels.5",
    },
  ],
};

module.exports = config;
