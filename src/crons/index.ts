// import { testCron } from "./test.cron";

import { removeOldTokens } from "./remove-old-tokens.cron";

export const runCronJobs = () => {
  // testCron.start();
  removeOldTokens.start();
};
