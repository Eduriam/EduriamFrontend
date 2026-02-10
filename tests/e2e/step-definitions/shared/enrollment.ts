import { Given } from "@cucumber/cucumber";

import { setLearningPathEnrolled } from "../../util/mockoon-env";

Given("I am enrolled in a course", async function () {
  await setLearningPathEnrolled(true);
});

Given("I am not enrolled in a course", async function () {
  await setLearningPathEnrolled(false);
});

