import { Given } from "@cucumber/cucumber";

import {
  setCourseEnrolled,
  setCoursePremium,
  setLearningPathPremium,
} from "../../util/mockoon-env";

Given("I am enrolled in the course", async function () {
  await setCourseEnrolled(true);
});

Given("I am not enrolled in the course", async function () {
  await setCourseEnrolled(false);
});

Given("the course is premium", async function () {
  await setCoursePremium(true);
});

Given("the course is not premium", async function () {
  await setCoursePremium(false);
});

Given("the learning path is premium", async function () {
  await setLearningPathPremium(true);
});

Given("the learning path is not premium", async function () {
  await setLearningPathPremium(false);
});
