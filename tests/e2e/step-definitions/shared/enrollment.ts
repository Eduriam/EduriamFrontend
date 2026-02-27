import { Given } from "@cucumber/cucumber";

import { setCourseEnrolled } from "../../util/mockoon-env";

Given("I am enrolled in the course", async function () {
  await setCourseEnrolled(true);
});

Given("I am not enrolled in the course", async function () {
  await setCourseEnrolled(false);
});
