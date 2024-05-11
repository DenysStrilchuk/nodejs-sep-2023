import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { tokenRepository } from "../repositories/token.repository";

dayjs.extend(utc);

const handler = async () => {
  try {
    // console.log("[START CRON] Remove old tokens");
    await tokenRepository.deleteByParams({
      createdAt: { $lt: dayjs().subtract(30, "days") },
    });
  } catch (error) {
    console.error("removeOldTokens: ", error);
  } finally {
    // console.log("[END CRON] Remove old tokens");
  }
};

export const removeOldTokens = new CronJob("0 0 4 * * *", handler);
