import { Given } from "@cucumber/cucumber";

import {
  setCourseEnrolled,
  setLearningPathEnrolled,
} from "../../util/mockoon-env";

Given("I am enrolled in a course", async function () {
  await setLearningPathEnrolled(true);
});

Given("I am not enrolled in a course", async function () {
  await setLearningPathEnrolled(false);
});

Given("I am enrolled in the course", async function () {
  await setCourseEnrolled(true);
});

Given("I am not enrolled in the course", async function () {
  await setCourseEnrolled(false);
});

