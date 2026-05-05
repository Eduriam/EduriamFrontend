import { Given } from "@cucumber/cucumber";

import { setCourseCertificate } from "../../util/mockoon-env";

Given("I have the course certificate", async function (): Promise<void> {
  await setCourseCertificate(true);
});

Given("I do not have the course certificate", async function (): Promise<void> {
  await setCourseCertificate(false);
});

Given("I have the learning path certificate", async function (): Promise<void> {
  await setCourseCertificate(true);
});

Given(
  "I do not have the learning path certificate",
  async function (): Promise<void> {
    await setCourseCertificate(false);
  },
);
