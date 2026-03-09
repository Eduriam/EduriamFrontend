import { Given } from "@cucumber/cucumber";

import { MockoonFeedVariant, setFeedVariant } from "../../util/mockoon-env";

const FEED_VARIANT_BY_STEP_VALUE: Record<string, MockoonFeedVariant> = {
  "streak-milestone": "streak-milestone",
  "achievement-earned": "achievement-earned",
  "league-promoted": "league-promoted",
  "course-completed": "course-completed",
};

Given(
  "I have a {string} progress feed message from a followed user",
  async function (messageVariant: string) {
    const feedVariant = FEED_VARIANT_BY_STEP_VALUE[messageVariant];

    if (!feedVariant) {
      throw new Error(
        `Unsupported feed message variant "${messageVariant}". Supported values: ${Object.keys(
          FEED_VARIANT_BY_STEP_VALUE,
        ).join(", ")}`,
      );
    }

    await setFeedVariant(feedVariant);
  },
);

Given(
  "there are no new progress feed messages from followed users",
  async () => {
    await setFeedVariant("empty");
  },
);
