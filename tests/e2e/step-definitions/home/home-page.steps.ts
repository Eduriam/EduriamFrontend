import { Given } from "@cucumber/cucumber";

import {
  setUpcomingLessonDefined,
  setUpcomingReviewDefined,
} from "../../util/mockoon-env";

Given("I have an upcoming lesson", async () => {
  await setUpcomingLessonDefined(true);
});

Given("I have no upcoming lesson", async () => {
  await setUpcomingLessonDefined(false);
});

Given("I have content to review", async () => {
  await setUpcomingReviewDefined(true);
});

Given("I have no content to review", async () => {
  await setUpcomingReviewDefined(false);
});

