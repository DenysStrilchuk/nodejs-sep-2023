// import { testCron } from "./test.cron";

import { notifyOldVisitors } from "./notification-old-visitor.cron";
import { removeOldTokens } from "./remove-old-tokens.cron";

export const runCronJobs = () => {
  // testCron.start();
  removeOldTokens.start();
  notifyOldVisitors.start();
};
