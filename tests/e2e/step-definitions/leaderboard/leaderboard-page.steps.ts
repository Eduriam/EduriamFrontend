import { Given } from "@cucumber/cucumber";

import { setLeaderboardStarted } from "../../util/mockoon-env";

Given("I have not studied in the current week", async () => {
  await setLeaderboardStarted(false);
});
